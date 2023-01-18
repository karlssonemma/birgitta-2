
const DEFAULT_CLASSES =
  "block uppercase text-sm text-black bg-green-light transition-colors hover:bg-green-dark p-4 w-full tracking-wider";

const VARIANT_CLASSES = {
  primary: "text-white bg-gray-900 hover:bg-gray-800 active:bg-gray-700",
  secondary: "bg-white hover:bg-gray-50 active:bg-gray-100 border border-black",
};

export const BUTTON_DEFAULT_CLASS = DEFAULT_CLASSES;
export const BUTTON_PRIMARY_CLASSES = `${DEFAULT_CLASSES} ${VARIANT_CLASSES.primary}`;
export const BUTTON_SECONDARY_CLASSES = `${DEFAULT_CLASSES} ${VARIANT_CLASSES.secondary}`;

