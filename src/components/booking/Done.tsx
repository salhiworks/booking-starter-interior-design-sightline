import type { RefObject } from 'react';
import { formatOf, roleOf } from '../../lib/services';
import { formatClockTime, formatDate, timeZoneLabel } from '@profitstudio/booking-engine';
import type { BookingConfirmation, Business, Service } from '@profitstudio/booking-engine';
import { ContactInstead } from './ContactInstead';

export type Outcome =
  | { kind: 'booked'; confirmation: BookingConfirmation; email: string }
  | { kind: 'preview' }
  | { kind: 'limit' };

interface DoneProps {
  outcome: Outcome;
  business: Business;
  /** The service as listed when it was booked (for where it happens), or null. */
  service?: Service | null;
  headingRef: RefObject<HTMLHeadingElement | null>;
  onAgain: () => void;
}

/** Shown only after verifyBooking answered ok: true — or, honestly, after PREVIEW_MODE. */
export function Done({ outcome, business, service = null, headingRef, onAgain }: DoneProps) {
  if (outcome.kind === 'preview') {
    return (
      <div className="done done--preview">
        <h2 className="step-title" tabIndex={-1} ref={headingRef} data-step-heading="">
          Preview — nothing was saved
        </h2>
        <p>
          This site is running on sample data, so no email was sent and no consultation was stored. Once the studio's booking system is
          connected, clients see their confirmation here.
        </p>
        <button type="button" className="button button--quiet" onClick={onAgain}>
          Start again
        </button>
      </div>
    );
  }

  if (outcome.kind === 'limit') {
    return (
      <div className="done">
        <h2 className="step-title" tabIndex={-1} ref={headingRef} data-step-heading="">
          You already have consultations booked with us
        </h2>
        <ContactInstead
          business={business}
          title="Let's find a time together"
          text="This email address already has as many upcoming appointments as we can hold online, so we couldn't add another and the time was released. Call or email the studio and we'll gladly help."
        />
      </div>
    );
  }

  const { confirmation, email } = outcome;
  const pending = confirmation.status === 'pending';
  const { locale } = business;
  return (
    <div className="done">
      <p className="done__mark" aria-hidden="true" />
      <h2 className="step-title" tabIndex={-1} ref={headingRef} data-step-heading="">
        {pending ? 'Request received — we’ll review your consultation and confirm the time shortly.' : 'Your consultation is booked.'}
      </h2>
      <p>
        {__BOOKING_DEMO__ ? (
          // Live Demo build only: no email exists to promise.
          <>
            This is a demo, so no email is sent.{' '}
            {pending ? 'Your request is waiting in the demo dashboard — confirm it there as the designer.' : 'Your consultation is in the demo dashboard.'}{' '}
            <a href="/admin/#bookings">Open the demo dashboard</a>
          </>
        ) : pending ? (
          `We're holding the time for you while I review your request. We'll email ${email} as soon as it's confirmed.`
        ) : (
          `A confirmation is on its way to ${email}.`
        )}
      </p>
      <p className="done__note">{doneNote(confirmation.serviceName, pending, service && service.name === confirmation.serviceName ? service : null)}</p>
      <dl className="done__details">
        <div>
          <dt>Appointment</dt>
          <dd>{confirmation.serviceName}</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>{formatDate(confirmation.date, locale, { weekday: 'long', month: 'long', day: 'numeric' })}</dd>
        </div>
        <div>
          <dt>Time</dt>
          <dd>
            {formatClockTime(confirmation.time, locale)}{' '}
            <span className="summary__zone">{timeZoneLabel(confirmation.timezone, locale)}</span>
          </dd>
        </div>
        <div>
          <dt>Reference</dt>
          <dd className="done__reference">{confirmation.reference}</dd>
        </div>
      </dl>
      <button type="button" className="button button--quiet" onClick={onAgain}>
        Book another consultation
      </button>
    </div>
  );
}

/**
 * What this booking is, by its role (read from the name the engine returned) and where it happens (the
 * service's own "Format:" words): always ONE appointment with the designer. It reserves that time — never a
 * design project, drawings, sourcing or any other deliverable; video-call links are emailed by the designer
 * personally (the engine creates none). Nothing is paid online.
 */
function doneNote(serviceName: string, pending: boolean, service: Service | null): string {
  const role = roleOf({ name: serviceName, description: service?.description ?? null });
  const format = service ? (formatOf(service)?.kind ?? null) : null;
  const until = pending ? 'Until it’s confirmed, this is a request — not a confirmed time. ' : '';
  const where =
    format === 'video'
      ? 'It’s a video call: I’ll email you the link myself once your time is confirmed. '
      : format === 'phone'
        ? 'It’s a phone call: I’ll call you at the number you gave. '
        : format === 'studio'
          ? 'It takes place at the studio. '
          : '';
  const prepare = 'Photos of the room and rough measurements help; you can email them once I’ve confirmed, or bring them along. ';
  if (role === 'discovery') {
    return `${until}${where}This is a short introductory call about your space and the right next step — not a design consultation${service?.priceCents === 0 ? ', and there’s nothing to pay' : ''}.`;
  }
  return `${until}${where}${prepare}This books one consultation — advice during the session, not a design project, drawings or sourcing. Nothing is paid online: the fee is settled after the consultation.`;
}
