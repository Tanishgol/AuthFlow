import Spinner from './Spinner.jsx';

const FullPageLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" className="text-primary-600" />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default FullPageLoader;
