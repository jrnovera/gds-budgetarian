import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link. No token provided.');
        return;
      }

      try {
        // 1. Get the verification token from Firestore
        const tokenDocRef = doc(db, 'verificationTokens', token);
        const tokenDoc = await getDoc(tokenDocRef);

        if (!tokenDoc.exists()) {
          setStatus('error');
          setMessage('Invalid or expired verification link.');
          return;
        }

        const tokenData = tokenDoc.data();
        const userId = tokenData.userId;
        const expiresAt = tokenData.expiresAt.toDate();

        // 2. Check if token is expired (24 hours)
        if (new Date() > expiresAt) {
          setStatus('error');
          setMessage('Verification link has expired. Please register again or request a new verification email.');
          // Clean up expired token
          await deleteDoc(tokenDocRef);
          return;
        }

        // 3. Update user's emailVerified status
        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, {
          emailVerified: true,
          verifiedAt: new Date()
        });

        // 4. Delete the verification token
        await deleteDoc(tokenDocRef);

        // 5. Success!
        setStatus('success');
        setMessage('Email verified successfully! You can now log in to your account.');
        toast.success('Email verified! Redirecting to login...');

        // 6. Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);

      } catch (error) {
        console.error('Error verifying email:', error);
        setStatus('error');
        setMessage('An error occurred while verifying your email. Please try again or contact support.');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #fff5e6 0%, #ffe4b5 100%)',
      }}
    >
      <div
        style={{
          maxWidth: 500,
          width: '90%',
          padding: '40px',
          borderRadius: 18,
          background: 'rgba(255,255,255,0.95)',
          boxShadow: '0 8px 32px rgba(224,185,115,0.2)',
          textAlign: 'center',
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: 30 }}>
          <img
            src="/images/gds-logo.png"
            alt="GDS Budgetarian Logo"
            width={100}
            height={100}
            style={{
              filter: 'drop-shadow(0 4px 8px #e0b97355)',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.7)',
              margin: '0 auto'
            }}
          />
        </div>

        {/* Status Icon */}
        <div style={{ marginBottom: 20 }}>
          {status === 'loading' && (
            <Loader className="animate-spin text-blue-500 mx-auto" size={64} />
          )}
          {status === 'success' && (
            <CheckCircle className="text-green-500 mx-auto" size={64} />
          )}
          {status === 'error' && (
            <XCircle className="text-red-500 mx-auto" size={64} />
          )}
        </div>

        {/* Message */}
        <h2
          style={{
            color: status === 'success' ? '#48bb78' : status === 'error' ? '#e53e3e' : '#333',
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: 15,
          }}
        >
          {status === 'loading' && 'Verifying Email...'}
          {status === 'success' && 'Email Verified!'}
          {status === 'error' && 'Verification Failed'}
        </h2>

        <p
          style={{
            color: '#666',
            fontSize: '1rem',
            lineHeight: 1.6,
            marginBottom: 30,
          }}
        >
          {message}
        </p>

        {/* Action Buttons */}
        {status === 'success' && (
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '12px 30px',
              background: 'linear-gradient(90deg, #e53e3e 0%, #ecc94b 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(229,62,62,0.3)',
            }}
          >
            Go to Login
          </button>
        )}

        {status === 'error' && (
          <div style={{ display: 'flex', gap: 15, justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/registration')}
              style={{
                padding: '12px 30px',
                background: 'linear-gradient(90deg, #e53e3e 0%, #ecc94b 100%)',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(229,62,62,0.3)',
              }}
            >
              Register Again
            </button>
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '12px 30px',
                background: 'white',
                color: '#e53e3e',
                border: '2px solid #e53e3e',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
