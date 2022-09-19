export function HeaderFallback({isHome}) {
  const styles = isHome
    ? 'bg-gray-light text-contrast'
    : 'bg-gray-light text-primary';
  return (
    <header
      role="banner"
      className={`${styles} flex h-nav items-center z-40 top-0 justify-between w-full leading-none gap-8 px-6 md:px-24 py-8`}
    >
      <Box isHome={isHome} wide={true} />
      <div className="flex space-x-4">
        <Box isHome={isHome} />
        <Box isHome={isHome} />
        <Box isHome={isHome} />
        <Box isHome={isHome} />
      </div>
    </header>
  );
}

function Box({wide, isHome}) {
  return (
    <div
      className={`h-6 rounded-sm ${wide ? 'w-36' : 'w-14'} ${
        isHome ? 'bg-[#f0f0f0]' : 'bg-[#f0f0f0]'
      }`}
    />
  );
}
