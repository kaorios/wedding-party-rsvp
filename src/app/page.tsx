import Image from 'next/image';
import Schedule from '../components/schedule';
import RSVPModalComponent from '../components/rsvp-modal';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-cream to-soft-peach">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 bg-warm-cream-light">
        <div className="absolute inset-0 flex flex-col justify-between items-center">
          <div className="relative max-w-[1200px] w-full">
            <Image
              src="/bg-hero-up.jpg"
              alt="Wedding Background Top"
              width={1200}
              height={600}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
          <div className="relative max-w-[1200px] w-full">
            <Image
              src="/bg-hero-bottom.jpg"
              alt="Wedding Background Bottom"
              width={1200}
              height={600}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-8 bg-warm-cream-light bg-opacity-90 p-6 rounded-lg backdrop-blur-sm">
            <h1 className="text-6xl md:text-8xl font-elegant font-extrabold text-foreground-heading mb-4 tracking-wider ">
              <span className="block md:inline">Ryohei</span>
              <span className="block md:inline md:mx-4">&</span>
              <span className="block md:inline">Kaori</span>
            </h1>
            <div className="w-32 h-1 bg-warm-coral mx-auto mb-6 rounded-full"></div>
            <p className="text-xl md:text-2xl text-warm-sage font-body">
              OCTOBER 19TH, 2025 | TOKYO, JAPAN
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-script text-warm-brown tracking-wide ">
            We&apos;re super excited to have you all with us on our big day.
          </h2>
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
          <div className="grid grid-cols-1  gap-12">
            <div className="flex justify-center items-start">
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-heading  mb-2">日時</h3>
                  <p className="text-xl font-semibold">
                    2025年10月19日 (日) 12:00-15:00
                  </p>
                </div>
                <div>
                  <h3 className="text-md font-heading  mb-2">会場</h3>
                  <a
                    href="https://brapla.com/invitation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-warm-coral hover:text-warm-coral-dark underline break-all"
                  >
                    GARDEN WEDDING
                  </a>
                </div>

                <div>
                  <h3 className="text-md font-heading  mb-2">住所</h3>
                  <p className="text-xl">福岡県北九州市八幡西区幸神</p>
                </div>

                <div>
                  <h3 className="text-md font-heading  mb-2">電話</h3>
                  <a
                    href="tel:03-1234-5678"
                    className="text-xl text-warm-coral hover:text-warm-coral-dark"
                  >
                    03-1234-5678
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="mb-16 space-y-3">
                <h3 className="text-2xl md:text-3xl font-heading text-warm-brown tracking-wide text-center">
                  Map
                </h3>
                <p className="text-warm-brown text-center">Tax Ok</p>
              </div>
              <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg border-2 border-warm-coral">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.6426924159397!2d130.7406937!3d33.8643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3543a3c3c3c3c3c3%3A0x1234567890abcdef!2z56aP5bKh55yM5YyX5Lmd5bee5biC5YWr5bmh6KW_5Yy65bm46Kez!5e0!3m2!1sja!2sjp!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-warm-cream">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl  font-heading text-warm-brown tracking-wide text-center mb-8">
            Schedule
          </h3>
          <Schedule />
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-soft-peach to-warm-cream">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-elegant font-extrabold text-foreground-heading tracking-wide mb-4 text-center">
              RSVP
            </h2>
          </div>
          <p className="text-lg font-semibold text-center  mb-6">
            お手数ではございますが
            <br />
            ご都合の程を9月2日迄に
            <br />
            ご一報賜りますようお願い申し上げます
          </p>
        </div>

        <RSVPModalComponent />

        <div className="max-w-4xl mx-auto">
          <p className="text-4xl font-script text-center text-warm-brown mt-10">
            We look forward to celebrating with you!
          </p>
        </div>
      </section>
    </div>
  );
}
