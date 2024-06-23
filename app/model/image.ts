export function getImageUrl(image?:{key?:string|null}|null){
    return image?.key?`${process.env.NEXT_PUBLIC_IMAGE_BUCKET_HOST}/${image.key}`:'placeholder.svg'
}