import { CommunityInput } from "@/src/features/communities/schemas/communitiesSchema";
import { UploadDropzone } from "@/src/shared/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import FormError from '../forms/FormError';

export default function UploadImage() {
    const [uploadedImage, setUploadedImage] = useState('')
    const { setValue, formState: {errors} } = useFormContext<CommunityInput>()

    return (
        <>
            <UploadDropzone
                endpoint={'meetiUploader'}
                className="ut-button:bg-orange-600 hover:ut-button:bg-orange-700"
                onClientUploadComplete={(res) => {
                    setUploadedImage(res[0].ufsUrl);
                    setValue('image', res[0].ufsUrl, {shouldValidate: true});
                }}
                appearance={{
                    button: "font-black py-3 w-full block h-auto rounded-none after:bg-orange-500 after:h-2 after:top-0",
                    label: "text-sm text-gray-600 hover:text-gray-600",
                    allowedContent: "text-sm"
                }}
                content={{
                    allowedContent: 'Máximo una imagen de un 1MB',
                    label: 'Elige un archivo o arrástrala aquí',
                    button: 'Selecciona una imagen'
                }}
                config={{
                    cn: twMerge
                }}
            />
            {uploadedImage &&
                <>
                    <p className="font-bold text-lg">Imagen subida</p>
                    <Image
                        src={uploadedImage}
                        alt='Imagen de la comunidad'
                        width={200}
                        height={300}
                    />
                </>
            }

            { errors.image && <FormError>{errors.image.message}</FormError> }
        </>
    );
}