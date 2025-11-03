# EmailJS Setup Guide for GDS Budgetarian

This guide will walk you through setting up EmailJS for custom email verification.

---

## Step 1: Create EmailJS Account

1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up"** (top right corner)
3. Create an account using your email
4. Verify your email address

---

## Step 2: Add Email Service

1. After logging in, click **"Email Services"** in the left sidebar
2. Click **"Add New Service"** button
3. Choose your email provider:
   - **Gmail** (Recommended - Easiest setup)
   - Outlook
   - Yahoo
   - Custom SMTP

### For Gmail:
1. Select **Gmail**
2. Click **"Connect Account"**
3. Sign in with your Gmail account
4. Allow EmailJS the necessary permissions
5. Give your service a name (e.g., "GDS Budgetarian")
6. **IMPORTANT**: Copy the **Service ID** (e.g., `service_abc123`)
7. Click **"Create Service"**

### Service ID Location:
- You'll see it at the top of the service details page
- Format: `service_xxxxxxx`
- **Save this Service ID** - you'll need it for the `.env` file

---

## Step 3: Create Email Template

1. Click **"Email Templates"** in the left sidebar
2. Click **"Create New Template"** button
3. Set up your template:

### Template Configuration:

**Template Name:** `Email Verification`

**Template Variables (DO NOT CHANGE THESE):**
- `{{to_email}}` - Recipient's email
- `{{from_email}}` - Sender's email
- `{{user_name}}` - User's name
- `{{verification_link}}` - Verification URL

### Email Content:

**Subject Line:**
```
Verify Your Email - GDS Budgetarian
```

**From Name:**
```
GDS Budgetarian
```

**From Email:**
```
{{from_email}}
```

**To Email:**
```
{{to_email}}
```

**HTML Body:**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(90deg, #e53e3e 0%, #ecc94b 100%);
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            color: white;
            margin: 0;
            font-size: 28px;
        }
        .content {
            padding: 40px 30px;
        }
        .content h2 {
            color: #e53e3e;
            margin-top: 0;
        }
        .content p {
            color: #666;
            line-height: 1.6;
            font-size: 16px;
        }
        .button {
            display: inline-block;
            padding: 15px 40px;
            background: linear-gradient(90deg, #e53e3e 0%, #ecc94b 100%);
            color: white !important;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
        }
        .footer {
            background-color: #f5f5f5;
            padding: 20px;
            text-align: center;
            color: #999;
            font-size: 14px;
        }
        .link-text {
            word-break: break-all;
            color: #e53e3e;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🛒 GDS Budgetarian</h1>
        </div>
        <div class="content">
            <h2>Welcome, {{user_name}}!</h2>
            <p>Thank you for registering with GDS Budgetarian. We're excited to have you on board!</p>
            <p>To complete your registration and start shopping, please verify your email address by clicking the button below:</p>
            <div style="text-align: center;">
                <a href="{{verification_link}}" class="button">Verify My Email</a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p class="link-text">{{verification_link}}</p>
            <p><strong>This link will expire in 24 hours.</strong></p>
            <p>If you didn't create an account with GDS Budgetarian, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>© 2024 GDS Budgetarian. All rights reserved.</p>
            <p>Fresh meals, groceries & more. Available 24/7 at budget-friendly prices.</p>
        </div>
    </div>
</body>
</html>
```

4. Click **"Save"** at the top right
5. **IMPORTANT**: Copy the **Template ID** (shown at top, e.g., `template_xyz123`)

---

## Step 4: Get Your Public Key

1. Click **"Account"** in the left sidebar (or your profile icon)
2. Scroll to the **"API Keys"** section
3. Find your **Public Key**
   - Format: Usually starts with letters (e.g., `AbCdEfGh123456789`)
4. **IMPORTANT**: Copy the **Public Key**

---

## Step 5: Configure Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual keys:

```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=YourPublicKey123
```

### Example:
```env
VITE_EMAILJS_SERVICE_ID=service_gds_budgetarian
VITE_EMAILJS_TEMPLATE_ID=template_verification_001
VITE_EMAILJS_PUBLIC_KEY=AbCdEfGhIjKlMnOp123
```

---

## Step 6: Test Your Setup

### Test Email Sending:

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Register a new account:**
   - Go to `http://localhost:5173/registration`
   - Fill out the registration form
   - Submit the form

3. **Check your email inbox:**
   - You should receive a verification email within 1-2 minutes
   - Check spam/junk folder if not in inbox
   - Click the "Verify My Email" button

4. **Verify the link works:**
   - Clicking the button should redirect you to the verification page
   - You should see "Email Verified!" message
   - You should be redirected to login

5. **Try logging in:**
   - Go to login page
   - Enter your credentials
   - You should be able to log in successfully

---

## Troubleshooting

### Emails Not Sending:

1. **Check EmailJS Dashboard:**
   - Go to EmailJS → Email History
   - Look for failed sends
   - Check error messages

2. **Verify Environment Variables:**
   - Make sure `.env` file exists
   - Check for typos in keys
   - Restart dev server after changing `.env`

3. **Check Console for Errors:**
   - Open browser DevTools (F12)
   - Check console for EmailJS errors
   - Look for network errors

### Emails Going to Spam:

1. **Verify Gmail Account:**
   - Make sure Gmail account is verified in EmailJS
   - Check Gmail security settings

2. **Add SPF/DKIM Records (Advanced):**
   - For production, configure custom domain
   - Add SPF and DKIM records in DNS

3. **EmailJS Free Tier Limits:**
   - Free tier: 200 emails/month
   - Consider upgrading for production

### Verification Link Not Working:

1. **Check Firestore Rules:**
   - Verify `verificationTokens` collection can be read/written
   - Check security rules

2. **Check Token Expiration:**
   - Tokens expire after 24 hours
   - Register again for new token

3. **Check URL:**
   - Make sure URL has `?token=` parameter
   - Verify token is not truncated

---

## Security Best Practices

1. **Never commit `.env` file to Git:**
   ```bash
   # .gitignore should include:
   .env
   .env.local
   ```

2. **Use Environment Variables:**
   - Always use `import.meta.env.VITE_*` for keys
   - Never hardcode keys in source code

3. **Rotate Keys Regularly:**
   - Change EmailJS keys if exposed
   - Update `.env` file

4. **Production Deployment:**
   - Set environment variables in hosting platform
   - For Vercel: Project Settings → Environment Variables
   - For Netlify: Site Settings → Environment Variables

---

## EmailJS Pricing

- **Free Tier:** 200 emails/month
- **Personal:** $7/month - 1,000 emails
- **Professional:** $15/month - 10,000 emails
- **Enterprise:** Custom pricing

For most startups, the free tier is sufficient for initial testing and development.

---

## Support

### EmailJS Support:
- Documentation: https://www.emailjs.com/docs/
- Support: https://www.emailjs.com/support/

### GDS Budgetarian:
- If you encounter issues with the implementation, check the browser console for error messages
- Verify all environment variables are correctly set
- Test with a clean registration (new email address)

---

## Quick Reference

**Your Keys Checklist:**
- [ ] Service ID: `service_________`
- [ ] Template ID: `template_________`
- [ ] Public Key: `__________________`
- [ ] Keys added to `.env` file
- [ ] Dev server restarted
- [ ] Test email sent successfully
- [ ] Verification link works

**Files Modified:**
- ✅ `src/pages/Registration.tsx` - Sends verification email
- ✅ `src/pages/VerifyEmail.tsx` - Handles email verification
- ✅ `src/pages/Login.tsx` - Checks email verification
- ✅ `src/App.tsx` - Added verify-email route
- ✅ `.env` - EmailJS configuration

---

**Setup Complete!** 🎉

Your custom email verification system is now ready to use!
