import { Image } from "@shopify/hydrogen";

const NoImage = () => {

    return(
        <div className="w-full h-96 mb-2 flex items-center justify-center bg-gray-medium">
            <Image 
                src="/no-photos.png"
                height={50}
                width={50}
                alt="no photos"
                
            />
        </div>
    )
}

export default NoImage;