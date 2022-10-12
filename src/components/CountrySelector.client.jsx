import {useCallback, useState, Suspense} from 'react';
import {useLocalization, fetchSync} from '@shopify/hydrogen';
// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import {Listbox} from '@headlessui/react';

import {IconCheck, IconCaret} from '~/components';
import {useMemo} from 'react';
import ipLookUp from '../lib/ipLookUp';

/**
 * A client component that selects the appropriate country to display for products on a website
 */
export function CountrySelector() {
  const [listboxOpen, setListboxOpen] = useState(false);
  const {
    country: {isoCode},
  } = useLocalization();
  const currentCountry = useMemo(() => {
    const regionNamesInEnglish = new Intl.DisplayNames(['en'], {
      type: 'region',
    });

    return {
      name: regionNamesInEnglish.of(isoCode),
      isoCode: isoCode,
    };
  }, [isoCode]);


  const setCountry = useCallback(
    ({isoCode: newIsoCode}) => {
      const currentPath = window.location.pathname;
      let redirectPath;

      if (newIsoCode !== 'US') {
        if (currentCountry.isoCode === 'US') {
          redirectPath = `/${newIsoCode.toLowerCase()}${currentPath}`;
        } else {
          redirectPath = `/${newIsoCode.toLowerCase()}${currentPath.substring(
            currentPath.indexOf('/', 1),
          )}`;
        }
      } else {
        redirectPath = `${currentPath.substring(currentPath.indexOf('/', 1))}`;
      }


      window.location.href = redirectPath;
    },
    [currentCountry],
  );


  return (
    <div className="relative text-sm">
      <Listbox onChange={setCountry}>
        {/* @ts-expect-error @headlessui/react incompatibility with node16 resolution */}
        {({open}) => {
          setTimeout(() => setListboxOpen(open));
          return (
            <>
              <Listbox.Button
                className={` bg-white flex items-center justify-between w-full py-2 px-2 border border-gray-medium ${
                  open ? 'rounded-b md:rounded-t md:rounded-b-none' : 'rounded'
                }`}
              >
                <span className="text-gray-dark tracking-wider">{currentCountry.name}</span>
                <IconCaret direction={open ? 'up' : 'down'} stroke='#898989' />
              </Listbox.Button>

              <Listbox.Options
                className={`border-t-gray-medium border-gray-medium bg-white absolute bottom-12 z-10 grid
                h-28 w-full overflow-y-scroll rounded-t border 
                transition-[max-height] duration-150 sm:bottom-auto md:rounded-b md:rounded-t-none
                md:border-t-0 md:border-b ${
                  listboxOpen ? 'max-h-18' : 'max-h-0'
                }`}
              >
                {listboxOpen && (
                  <Suspense fallback={<div className="p-2 text-gray-dark">Loading…</div>}>
                    {/* @ts-expect-error @headlessui/react incompatibility with node16 resolution */}
                    <Countries
                      selectedCountry={currentCountry}
                      getClassName={(active) => {
                        return `w-full p-2 transition rounded 
                        flex justify-start items-center text-left cursor-pointer`;
                      }}
                    />
                  </Suspense>
                )}
              </Listbox.Options>
            </>
          );
        }}
      </Listbox>
    </div>
  );
}

export function Countries({selectedCountry, getClassName}) {
  const countries = fetchSync('/api/countries').json();

  return (countries || []).map((country) => {
    const isSelected = country.isoCode === selectedCountry.isoCode;

    return (
      <Listbox.Option key={country.isoCode} value={country}>
        {/* @ts-expect-error @headlessui/react incompatibility with node16 resolution */}
        {({active}) => (
          <div
            className={`text-gray-dark ${getClassName(
              active,
            )}`}
          >
            {country.name}
            {isSelected ? (
              <span className="ml-2">
                <IconCheck />
              </span>
            ) : null}
          </div>
        )}
      </Listbox.Option>
    );
  });
}
