import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface NotificationData {
  type: 'new_order' | 'order_updated' | 'order_cancelled';
  orderId: string;
  message: string;
  recipientRole: 'admin' | 'staff' | 'both';
  read: boolean;
  createdAt: any;
  metadata?: {
    customerName?: string;
    orderTotal?: number;
    paymentMethod?: string;
  };
}

/**
 * Create a notification for new order
 */
export async function createNewOrderNotification(orderId: string, orderData: any) {
  try {
    const customerName = `${orderData.firstName} ${orderData.lastName}`.trim() || 'Customer';
    const total = orderData.total || 0;

    const notification: NotificationData = {
      type: 'new_order',
      orderId,
      message: `New order from ${customerName} - ₱${total.toFixed(2)}`,
      recipientRole: 'both', // Both admin and staff can see
      read: false,
      createdAt: Timestamp.now(),
      metadata: {
        customerName,
        orderTotal: total,
        paymentMethod: orderData.paymentMethod,
      },
    };

    await addDoc(collection(db, 'notifications'), notification);
    console.log('Notification created successfully');
  } catch (error) {
    console.error('Error creating notification:', error);
    // Don't throw error to prevent order creation failure
  }
}

/**
 * Create a notification for order status update
 */
export async function createOrderUpdateNotification(
  orderId: string,
  status: string,
  customerName: string
) {
  try {
    const notification: NotificationData = {
      type: 'order_updated',
      orderId,
      message: `Order for ${customerName} updated to: ${status}`,
      recipientRole: 'both',
      read: false,
      createdAt: Timestamp.now(),
      metadata: {
        customerName,
      },
    };

    await addDoc(collection(db, 'notifications'), notification);
  } catch (error) {
    console.error('Error creating update notification:', error);
  }
}

/**
 * Create a notification for order cancellation
 */
export async function createOrderCancelNotification(orderId: string, customerName: string) {
  try {
    const notification: NotificationData = {
      type: 'order_cancelled',
      orderId,
      message: `Order from ${customerName} was cancelled`,
      recipientRole: 'both',
      read: false,
      createdAt: Timestamp.now(),
      metadata: {
        customerName,
      },
    };

    await addDoc(collection(db, 'notifications'), notification);
  } catch (error) {
    console.error('Error creating cancel notification:', error);
  }
}
