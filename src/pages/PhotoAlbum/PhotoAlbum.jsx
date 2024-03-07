/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as S from "./style";
/**
 *  1. 사진 등록하기를 통해 등록된 이미지들을 각자 자유롭게 디자인하여 불러와야함.
 *  2. localStorage에 저장된 사진이 없으면 
 *      <h1>불러올 사진이 없습니다.<h1>
 *      문구가 중앙에 나오도록해야함.
 */

function PhotoAlbum() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const storedImages = JSON.parse(localStorage.getItem('saveImages')) || [];
        setImages(storedImages);
    }, []);

    return (
        <div css={S.albumLayout}>
            <h1 css={S.albumImg}>사진 갤러리</h1>
            {images.length === 0 ? (
                <h1 css={S.layout}>불러올 사진이 없습니다.</h1>
            ) : (
                <div css={S.layout}>
                    {images.map((image, index) => (
                        <div key={index} css={S.imageContainer}>
                            <img src={image.imageUrl} alt={`Image ${index}`} css={S.image} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PhotoAlbum;