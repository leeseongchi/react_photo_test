/** @jsxImportSource @emotion/react */
import * as S from "./style";
import WideButton from "../../components/WideButton/WideButton";
import { useRef, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

/**
 *  1. 사진 불러오기 버튼을 클릭 후 5개 이상의 이미지를 불러올 수 있어야함.
 *  2. PromiseAll을 사용하여 이미지를 순서대로 불러와야함.
 *  3. 불러오기가 완료되면 "이미지를 저장하시겠습니까?" 라는 확인 취소 메세지 창이 떠야함.
 *  4. 확인 클릭시 localStorage에 key: photo, value: JSON 데이터
 *      [
 *          {
 *              id: 1,
 *              imageUrl: ""
 *          },
 *          {
 *              id: 2,
 *              imageUrl: ""
 *          }
 *      ]
 *      형식으로 저장되어야함.
 *  5. 취소시 저정되면 안됨.
 */

function PhotoRegister() {
    const fileInputRef = useRef();
    const imageIdRef = useRef(0);
    const [ loadImages, setLoadImages ] = useState([]);
    const [ showModal, setShowModal ] = useState(false);

    const handleFileChange = (e) => {
        const { files } = e.target;
        const fileArray = Array.from(files);

        if(fileArray.length === 0) {
            return;
        }

        let promises = [];

        promises = fileArray.map(file => new Promise(reslove => {
            const loadImage = {
                id: imageIdRef.current += 1,
                file,
                dataURL: ""
            };

            const fileReader = new FileReader();

            fileReader.onload = (e) => {
                reslove({
                    ...loadImage,
                    dataURL: e.target.result
                });
            };

            fileReader.readAsDataURL(file);
        }));

        Promise.all(promises)
        .then((result) => {
            setLoadImages(result);
            setShowModal(true);
        });
    }

    const handleSaveImages = () => {
        const imagesToSave = loadImages.map((image) => ({
            id: image.id,
            imageUrl: image.dataURL,
        }));
        localStorage.setItem("saveImages", JSON.stringify(imagesToSave));
        setShowModal(false);
    }

    const handleCancelSave = () => {
        setShowModal(false);
    }

    return (
        <div css={S.layout}>
            <h1 css={S.title}>사진 등록하기</h1>
            <input type="file" style={{display: "none"}} multiple={true} ref={fileInputRef} onChange={handleFileChange}/>
            <WideButton text={"사진 불러오기"} onClick={() => {fileInputRef.current.click()}}/>
            <ConfirmationModal 
                isOpen={showModal}
                message="이미지를 저장하시겠습니까?"
                onCancel={handleCancelSave}
                onConfirm={handleSaveImages}
            />
        </div>
    );
}

export default PhotoRegister;

