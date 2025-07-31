import Image from 'next/image';
import Schedule from '@/components/schedule';
import RSVPModalComponent from '@/components/rsvp';

export default function Home() {
  const weddingDetails = {
    coupleName1: process.env.NEXT_PUBLIC_COUPLE_NAME_1 || '',
    coupleName2: process.env.NEXT_PUBLIC_COUPLE_NAME_2 || '',
    dateEn: process.env.NEXT_PUBLIC_WEDDING_DATE_EN || '',
    locationEn: process.env.NEXT_PUBLIC_WEDDING_LOCATION_EN || '',
    dateJp: process.env.NEXT_PUBLIC_WEDDING_DATE || '',
    time: process.env.NEXT_PUBLIC_WEDDING_TIME || '',
    venue: process.env.NEXT_PUBLIC_WEDDING_VENUE || '',
    venueUrl: process.env.NEXT_PUBLIC_WEDDING_VENUE_URL || '',
    address: process.env.NEXT_PUBLIC_WEDDING_ADDRESS || '',
    phone: process.env.NEXT_PUBLIC_WEDDING_PHONE || '',
    rsvpDeadline: process.env.NEXT_PUBLIC_RSVP_DEADLINE || '',
    googleMapUrl: process.env.NEXT_PUBLIC_GOOGLE_MAP_URL || '',
    taxiNoticeTitle: process.env.NEXT_PUBLIC_TAXI_NOTICE_TITLE || '',
    taxiNoticeText: process.env.NEXT_PUBLIC_TAXI_NOTICE_TEXT || '',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-cream to-soft-peach">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 bg-warm-cream-light overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-between items-center">
          <div className="relative max-w-[1200px] w-full">
            <Image
              src="/bg-hero-up.png"
              alt="Wedding Background Top"
              width={1200}
              height={600}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
          <div className="relative max-w-[1200px] w-full">
            <Image
              src="/bg-hero-bottom.png"
              alt="Wedding Background Bottom"
              width={1200}
              height={600}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="bg-warm-cream-light bg-opacity-90 p-6 rounded-lg backdrop-blur-sm">
            <h1 className="text-6xl md:text-8xl font-elegant font-extrabold text-foreground-heading mb-4 tracking-wider ">
              <span className="block md:inline">
                {weddingDetails.coupleName1}
              </span>
              <span className="block md:inline md:mx-4">&</span>
              <span className="block md:inline">
                {weddingDetails.coupleName2}
              </span>
            </h1>
            <div className="w-32 h-1 bg-warm-coral mx-auto mb-6 rounded-full"></div>
            <h2 className="text-xl md:text-2xl text-warm-sage font-body">
              {weddingDetails.dateEn} | {weddingDetails.locationEn}
            </h2>
            <p className="text-2xl md:text-3xl font-script text-warm-brown tracking-wide mt-8">
              We are super excited to have you all with us on our big day
            </p>
          </div>
        </div>
      </section>

      {/* Event Details & Location */}
      <section className="py-20 px-4 bg-warm-cream">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-elegant font-extrabold text-foreground-heading tracking-wide mb-4 text-center">
              Event Details
            </h2>
          </div>

          {/* Content - Mobile: stacked, Desktop: side by side */}
          <div className="grid grid-cols-1 gap-20 sm:gap-16">
            <div className="flex justify-center items-start">
              <div className="space-y-6">
                <div>
                  <h3 className="text-md text-foreground-heading font-heading mb-2">
                    日時
                  </h3>
                  <p className="text-xl">
                    {weddingDetails.dateJp}
                    <br />
                    {weddingDetails.time}
                  </p>
                </div>
                <div>
                  <h3 className="text-md text-foreground-heading font-heading mb-2">
                    会場
                  </h3>
                  <p className="text-xl">{weddingDetails.venue}</p>
                </div>

                <div>
                  <h3 className="text-md text-foreground-heading font-heading mb-2">
                    住所
                  </h3>
                  <p className="text-xl">{weddingDetails.address}</p>
                </div>

                <div>
                  <h3 className="text-md text-foreground-heading font-heading mb-2">
                    電話
                  </h3>
                  <a
                    href={`tel:${weddingDetails.phone}`}
                    className="text-xl text-warm-coral hover:text-warm-coral-dark"
                  >
                    {weddingDetails.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-elegant font-extrabold tracking-wide text-center">
                Map
              </h3>
              <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg border-2 border-warm-coral">
                <iframe
                  src={weddingDetails.googleMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <p className="text-center">
                <span className="text-lg font-semibold">
                  {weddingDetails.taxiNoticeTitle}
                </span>
                <br />
                <span
                  dangerouslySetInnerHTML={{
                    __html: weddingDetails.taxiNoticeText,
                  }}
                />
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-elegant font-extrabold tracking-wide text-center mb-8">
                Schedule
              </h3>
              <Schedule />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-soft-peach to-warm-cream">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-elegant font-extrabold text-foreground-heading tracking-wide mb-4 text-center">
              RSVP
            </h2>
          </div>
          <p className="text-lg text-center mb-6">
            お手数ではございますが
            <br />
            ご都合の程を{weddingDetails.rsvpDeadline}迄に
            <br />
            ご一報賜りますようお願い申し上げます
          </p>
        </div>

        <RSVPModalComponent />

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8 mt-10">
            <Image
              src="/couple.png"
              alt="Couple Photo"
              width={300}
              height={200}
              className="w-64 h-auto object-cover opacity-90"
            />
          </div>
          <p className="text-4xl font-script text-center text-warm-brown">
            Thank you!
          </p>
          <p className="text-sm text-center text-warm-brown mt-6">
            We look forward to celebrating with you
          </p>
        </div>
      </section>
    </div>
  );
}
