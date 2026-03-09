import NewHeader from '../components/layout/NewHeader';

/**
 * Example usage of the BNI Header component
 * 
 * This demonstrates how to integrate the header into your application.
 * The header is fully self-contained and requires no additional props.
 */

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Component */}
      <NewHeader />

      {/* Page Content */}
      <main className="mx-auto py-12" style={{ maxWidth: '1240px', paddingLeft: '24px', paddingRight: '24px' }}>
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-[#222222] mb-4">
            Welcome to BNI
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            The world's largest and most successful referral networking organization.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-[#222222] mb-2">355K+ Members</h3>
              <p className="text-gray-600">Global members worldwide</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-[#222222] mb-2">11,600+ Chapters</h3>
              <p className="text-gray-600">Chapters across 76 countries</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-[#222222] mb-2">$26.5B+ Revenue</h3>
              <p className="text-gray-600">Member generated business</p>
            </div>
          </div>
        </div>

        {/* Additional Content Sections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">
              How It Works
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-[#d71920] font-bold mr-2">1.</span>
                <span>Join a local BNI chapter in your area</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#d71920] font-bold mr-2">2.</span>
                <span>Attend weekly meetings with fellow business professionals</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#d71920] font-bold mr-2">3.</span>
                <span>Give and receive quality referrals</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#d71920] font-bold mr-2">4.</span>
                <span>Grow your business through trusted relationships</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-[#222222] mb-4">
              Get Started Today
            </h2>
            <p className="text-gray-600 mb-6">
              Ready to grow your business through the power of referrals? 
              Find a chapter near you or learn more about starting your own.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/find-a-chapter"
                className="px-6 py-3 text-center rounded-full text-white font-semibold shadow-md hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(90deg, #d71920, #c40000)' }}
              >
                Find a Chapter
              </a>
              <a
                href="/start-a-chapter"
                className="px-6 py-3 text-center rounded-full border-2 border-[#d71920] text-[#d71920] font-semibold hover:bg-[#d71920] hover:text-white transition-colors"
              >
                Start a Chapter
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Placeholder */}
      <footer className="bg-[#222222] text-white py-8 mt-12">
        <div className="mx-auto text-center" style={{ maxWidth: '1240px', paddingLeft: '24px', paddingRight: '24px' }}>
          <p className="text-sm text-gray-400">
            © 2026 BNI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
