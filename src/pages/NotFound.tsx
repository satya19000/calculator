import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
      <div>
        <div className="text-8xl font-black text-blue-500 dark:text-blue-400 mb-4">404</div>
        <h1 className="text-3xl font-bold mb-3">Page Not Found</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">The calculator or page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-gradient px-8 py-3 text-base">Back to Home</Link>
      </div>
    </div>
  );
}
