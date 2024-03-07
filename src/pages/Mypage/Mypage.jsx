/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import WideButton from "../../components/WideButton/WideButton";
import { useInput } from "../../hooks/useInput";
import * as S from "./style";
import defaultProfile from "../../assets/images/profile/default.jpeg"
import { useUserData } from "../../hooks/useUserData";


/**
 * 
 * 1. 이미지 클릭시 이미지 변경가능해야함.
 * 2. 수정하기 버튼 클릭시 localStorage에 key: user value: JSON데이터
 *  {
 *      nickname: "테스트계정",
 *      namd: "김준일",
 *      birthday: "1994-09-07",
 *      imgUrl: ""
 *  }
 *  저장되어야하고 페이지 로드시 불러와야함.
 * 3. RootHeader의 프로필 이미지도 변경되어야함.
 */

function Mypage(props) {
    const [ nicknameValue, handleNicknameOnChange ] = useInput();
    const [ nameValue, handleNameOnChange ] = useInput();
    const [ birthdayValue, handleBirthdayOnChange ] = useInput();
    const [ profileUrl, setProfileUrl ] = useState(defaultProfile);
    const imgFileRef = useRef();

    const { userData, setUserData } = useUserData();

    useEffect(() => {
        const storeUserData = JSON.parse(localStorage.getItem("user"));
        if (storeUserData) {
            handleNicknameOnChange(storeUserData.nickname);
            handleNameOnChange(storeUserData.name);
            handleBirthdayOnChange(storeUserData.birthday);
            setProfileUrl(storeUserData.imgUrl);
            setUserData(storeUserData);
        }
    }, []);

    const handleImgfileChange = (e) => {
        const fileReader = new FileReader();

        if(e.target.files.length === 0) {
            return;
        }

        fileReader.onload = (e) => {
            setProfileUrl(e.target.result);
        };

        fileReader.readAsDataURL(e.target.files[0]);
    }

    const handleModifyClick = () => {
        const updateUserData = {
            nickname: nicknameValue,
            name: nameValue,
            birthday: birthdayValue,
            imgUrl: profileUrl
        };
        
        setUserData(updateUserData);
        localStorage.setItem("user", JSON.stringify(updateUserData));
        alert("글 수정 완료.");
    }
    
    return (
        <div css={S.layout}>
            <div css={S.imageBox} onClick={() => imgFileRef.current.click()}>
                <img src={profileUrl} alt="" />
                <input style={{display: "none"}} type="file" ref={imgFileRef} onChange={handleImgfileChange}/>
            </div>
            
            <input css={S.inputBox} type="text" name="nickname" placeholder="닉네임" value={nicknameValue} onChange={handleNicknameOnChange}/>
            <input css={S.inputBox} type="text" name="name" placeholder="이름" value={nameValue} onChange={handleNameOnChange}/>
            <input css={S.inputBox} type="text" name="birthday" placeholder="생년월일" value={birthdayValue} onChange={handleBirthdayOnChange}/>
            <WideButton text={"수정하기"} onClick={handleModifyClick}/>
        </div>
    );
}

export default Mypage;