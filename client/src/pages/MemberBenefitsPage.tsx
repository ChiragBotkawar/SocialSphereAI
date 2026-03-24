import { Helmet } from 'react-helmet-async';
import Container from '../components/ui/Container';

/* ─── Data ──────────────────────────────────────────────────── */

const BNI_CONNECT_FEATURES = [
  'Participate in private groups and forums',
  'Record details of your 1-2-1 meetings',
  'Track referrals and business passed',
  'Connect with global Members',
];

const BNI_ACADEMY_FEATURES = [
  'Professional Education on Business Growth',
  'Guided Programs for Networking Success',
  'Conference keynote recordings',
  'Videos, podcasts and webinars',
];

const BNI_STORE_FEATURES = [
  'BWN Official Merchandise',
  'BWN Branded Assets',
  'Pens & stationery',
  'Apparel & bags',
];

/* ─── Cascading Feature Pills ───────────────────────────────── */

function FeaturePills({ features, direction = 'right' }: { features: string[]; direction?: 'right' | 'left' }) {
  return (
    <div className="flex flex-col items-start gap-3">
      {features.map((label, i) => (
        <div
          key={label}
          className="rounded-md bg-white/90 px-5 py-3.5 text-[13px] font-medium text-gray-800 shadow-[0_2px_12px_rgba(0,0,0,0.08)] backdrop-blur-sm"
          style={{
            marginLeft: direction === 'right' ? `${i * 16}px` : `${(features.length - 1 - i) * 16}px`,
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

/* ─── Page Component ────────────────────────────────────────── */

export default function MemberBenefitsPage() {
  return (
    <>
      <Helmet>
        <title>Exclusive Member Benefits | BWN</title>
        <meta
          name="description"
          content="Get access to tools and resources built to help BWN Members maximize their business growth. Explore BWN Connect, BWN Academy, and the BWN Global Store."
        />
      </Helmet>

      {/* ══════════════════════════════════════════════════════════════
          Section 1 — BWN Connect
          ══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          {/* Top header row */}
          <div className="mb-14 grid items-start gap-6 lg:grid-cols-2">
            <h2 className="text-4xl font-black leading-tight text-dark lg:text-[52px]">
              Exclusive Member
              <br />
              <span className="text-primary">Benefits</span>
            </h2>
            <p className="text-lg leading-relaxed text-gray-500 lg:pt-3">
              Get access to tools and resources built to help BWN Members
              maximize their business growth.
            </p>
          </div>

          {/* Two-col: text left · image+pills right */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left */}
            <div>
              {/* BNI Connect logo text */}
              <div className="mb-5">
                <span className="text-[42px] font-black leading-none tracking-tight text-primary">BN</span>
                <span className="text-[42px] font-black leading-none tracking-tight text-primary" style={{ fontStyle: 'italic' }}>i</span>
                <br />
                <span className="text-[38px] font-bold leading-none tracking-tight text-dark">connect</span>
                <span className="text-primary text-[38px] font-black">.</span>
              </div>

              <p className="max-w-md text-[15px] leading-relaxed text-gray-500">
                BWN Connect® is an exclusive app that makes networking
                effortless, helping you connect with fellow Members, track your
                success, and grow your business within a seamless platform.
              </p>

              <a
                href="https://www.bniconnectglobal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full bg-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-red-700"
              >
                Access BWN Connect
              </a>

              {/* App store badges */}
              <div className="mt-6 flex items-center gap-4">
                <a
                  href="https://play.google.com/store/apps/details?id=com.bni.connect"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="h-10 w-auto"
                  />
                </a>
                <a
                  href="https://apps.apple.com/app/bni-connect/id123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <img
                    src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    className="h-10 w-auto"
                  />
                </a>
              </div>
            </div>

            {/* Right — phone + cascading pills */}
            <div className="relative">
              {/* Soft bg */}
              <div className="absolute right-0 top-1/2 h-[90%] w-[85%] -translate-y-1/2 rounded-3xl bg-[#f0f0f0]" />

              <div className="relative z-10 flex items-center justify-center gap-0">
                {/* Pills float left of phone */}
                <div className="hidden lg:block">
                  <FeaturePills features={BNI_CONNECT_FEATURES} direction="right" />
                </div>

                {/* Phone */}
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=520&fit=crop"
                  alt="BWN Connect app on phone"
                  className="relative -ml-6 h-[400px] w-auto rounded-[2.5rem] object-cover shadow-xl lg:h-[440px]"
                />
              </div>

              {/* Mobile pills */}
              <div className="mt-6 lg:hidden">
                <FeaturePills features={BNI_CONNECT_FEATURES} direction="right" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          Section 2 — BWN Academy
          ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#fafafa] py-16 lg:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left — laptop + cascading pills */}
            <div className="relative">
              <div className="absolute left-0 top-1/2 h-[90%] w-[85%] -translate-y-1/2 rounded-3xl bg-[#ececec]" />

              <div className="relative z-10 flex items-center justify-center gap-0">
                {/* Laptop */}
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=550&h=380&fit=crop"
                  alt="BWN Academy on laptop"
                  className="h-[320px] w-auto rounded-xl object-cover shadow-xl lg:h-[370px]"
                />

                {/* Pills cascade right */}
                <div className="-ml-4 hidden lg:block">
                  <FeaturePills features={BNI_ACADEMY_FEATURES} direction="right" />
                </div>
              </div>

              {/* Mobile pills */}
              <div className="mt-6 lg:hidden">
                <FeaturePills features={BNI_ACADEMY_FEATURES} direction="right" />
              </div>
            </div>

            {/* Right — text */}
            <div>
              {/* BNI Academy logo text */}
              <div className="mb-5">
                <span className="text-[46px] font-black leading-none tracking-tight text-primary">BN</span>
                <span className="text-[46px] font-black leading-none tracking-tight text-primary" style={{ fontStyle: 'italic' }}>i</span>
                <span className="text-[14px] font-normal text-primary align-top">®</span>
                <br />
                <span className="text-[40px] font-bold leading-none tracking-tight text-dark">Academy</span>
              </div>

              <p className="max-w-md text-[15px] leading-relaxed text-gray-500">
                BWN&apos;s global online learning platform, BWN Academy, enables
                Members and Directors to grow their businesses, excel within the
                BWN network, and live our Core Value of Lifelong Learning.
              </p>

              <a
                href="https://www.bniacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full border-2 border-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-white"
              >
                Access The BWN Academy
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          Section 3 — BWN Global Store
          ══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left — text */}
            <div>
              <h3 className="mb-5 text-4xl font-black text-dark lg:text-[48px] lg:leading-tight">
                BWN{' '}
                <span className="font-black italic text-primary">Global Store</span>
              </h3>

              <p className="max-w-md text-[15px] leading-relaxed text-gray-500">
                Shipping worldwide, the Global Store is your go-to destination
                for exclusive BWN merchandise, featuring a range of branded items
                to help you represent BWN with pride.
              </p>

              <a
                href="https://www.bniglobalstore.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full bg-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-red-700"
              >
                Access The Global Store
              </a>
            </div>

            {/* Right — store image + cascading pills */}
            <div className="relative">
              <div className="absolute right-0 top-1/2 h-[90%] w-[85%] -translate-y-1/2 rounded-3xl bg-[#f0f0f0]" />

              <div className="relative z-10 flex items-center justify-center gap-0">
                {/* Pills cascade left of image */}
                <div className="hidden lg:block">
                  <FeaturePills features={BNI_STORE_FEATURES} direction="left" />
                </div>

                {/* Store image */}
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=550&h=380&fit=crop"
                  alt="BWN Global Store merchandise"
                  className="-ml-4 h-[320px] w-auto rounded-xl object-cover shadow-xl lg:h-[370px]"
                />
              </div>

              {/* Mobile pills */}
              <div className="mt-6 lg:hidden">
                <FeaturePills features={BNI_STORE_FEATURES} direction="right" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
