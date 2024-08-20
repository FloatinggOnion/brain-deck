import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(request: NextRequest) {
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    console.error('Missing Stripe signature');
    return NextResponse.json({ error: 'Webhook Error: Missing Stripe signature' }, { status: 400 });
  }

  const body = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error(`⚠️  Webhook signature verification failed: ${(err as Error).message}`);
    return NextResponse.json({ error: `Webhook Error: ${(err as Error).message}` }, { status: 400 });
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`PaymentIntent was successful! ID: ${paymentIntent.id}`);
      break;

    case 'payment_intent.payment_failed':
      const paymentFailed = event.data.object as Stripe.PaymentIntent;
      console.log(`PaymentIntent failed: ${paymentFailed.last_payment_error?.message}`);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
