import { MediaFile, Image, useProductOptions} from "@shopify/hydrogen/client";
import NoImage from "../components/NoImage";

/**
 * A client component that defines a media gallery for hosting images, 3D models, and videos of products
 */
export default function Gallery({media}) {

  const {selectedVariant} = useProductOptions();

  const featuredMedia = selectedVariant.image || media[0]?.image;
  const featuredMediaSrc = featuredMedia?.url.split("?")[0];
  const galleryMedia = media.filter((med) => {
    if (
      med.mediaContentType === MODEL_3D_TYPE ||
      med.mediaContentType === VIDEO_TYPE ||
      med.mediaContentType === EXTERNAL_VIDEO_TYPE
    ) {
      return true;
    }

    return !med.image.url.includes(featuredMediaSrc);
  });

  if (!media.length) {
    return <NoImage />;
  }

  let imgWidth = galleryMedia.length <= 0 ? "w-full" : "w-[80vw]";

  return (

    <div
      className="md:hidden gap-4 flex overflow-x-scroll no-scrollbar scroll-snap-x scroll-smooth h-[485px] place-content-start"
      tabIndex="-1"
    >
      <Image
        data={selectedVariant.image}
        alt={selectedVariant.image.altText}
        className={`${imgWidth} h-full object-cover object-center flex-shrink-0 snap-start`}
      />
      
      {galleryMedia.map((med) => { 
        return (
          <MediaFile
            tabIndex="0"
            key={med.id || med.image.id}
            className="md:w-auto h-full md:h-auto object-cover object-center transition-all snap-start flex-shrink-0"
            data={med}
            options={{
              height: "485",
            }}
            // alt={med.image.altText}
            // {...extraProps}
          />
        );
      })}
    </div>
  );
}

const MODEL_3D_TYPE = "MODEL_3D";
const MODEL_3D_PROPS = {
  interactionPromptThreshold: "0",
};
const VIDEO_TYPE = "VIDEO";
const EXTERNAL_VIDEO_TYPE = "EXTERNAL_VIDEO";
