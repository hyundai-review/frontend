import { myReviewData, review } from '@/assets/data/myReviewData'
import StarRating from '@/components/common/StarRating'
import ReviewSwiper from '@/components/reviewSwiper/ReviewSwiper'
import { transformReviewData } from '@/utils/dataTransform'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ReviewCard from '../../components/review/ReviewCard'
import MyReview from './MyReview'
import { isLoggedIn } from '@/utils/logInManager'
import { useNavigate } from 'react-router-dom'
function MovieReview({ data }) {
  const navigate = useNavigate()
  // data
  const reviewCount = 123
  const averageRating = 4.23
  const transformedData = transformReviewData(myReviewData)
  // 상태
  const [isReviewWritten, setIsReviewWritten] = useState(true)
  // ---------------------------login---------------------------
  const [isLogIn, setIsLogIn] = useState(isLoggedIn())
  useEffect(() => {
    setIsLogIn(isLoggedIn())
  }, [])

  return (
    <Wrap>
      <TitleWrap>
        <Title>리뷰({reviewCount})</Title>
        {isLogIn && (
          <RatingWrap>
            <StarRating type='readonly' initialValue='1' max={1} size={24} />
            <AverageRating>{averageRating}</AverageRating>
          </RatingWrap>
        )}
      </TitleWrap>
      {!isLogIn ? (
        <Box>
          <TextWrap>
            <Text>
              <BoldText onClick={() => navigate('/user/login')}>회원가입</BoldText>을 통해 리뷰를
              확인하세요
            </Text>
          </TextWrap>
        </Box>
      ) : (
        <>
          <ReviewContentsContainer>
            <ReviewSwiper dataList={transformedData} />
            {!isReviewWritten ? (
              <ButtonWrap className='hoverBright'>
                <ReviewPostButton>스토리 & 리뷰 작성하기</ReviewPostButton>
              </ButtonWrap>
            ) : (
              <ButtonWrap>
                <MyReview review={review} />
              </ButtonWrap>
            )}
            <>
              <ReviewContainer>
                {/* <ReviewCard /> */}
                {transformedData.map((review) => (
                  <ReviewCard pageType='movieDetail' key={review.movieId} review={review} />
                ))}
              </ReviewContainer>
            </>
          </ReviewContentsContainer>
        </>
      )}
    </Wrap>
  )
}

export default MovieReview
const Wrap = styled.div`
  margin-top: 20px;
`
const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`
const Title = styled.div`
  color: var(--gray-200, #e4e4e7);
  /* light/lg */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  line-height: 30px;
`
const Box = styled.div`
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  width: 100%;
  height: 100px;
`
const TextWrap = styled.div`
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Text = styled.div`
  color: var(--gray-50, #fafafa);
  text-align: center;

  /* light/md */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 200;
  line-height: 24px; /* 150% */
`
const BoldText = styled.span`
  font-weight: 700;
  cursor: pointer;
`

const RatingWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`
const AverageRating = styled.div`
  color: var(--gray-50, #fafafa);
  text-shadow: 0px 0px 10px var(--primary-light-red, #ffd7d7);

  /* bold/lg */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 150% */
`
const ReviewContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const ButtonWrap = styled.div`
  border-radius: 5px;
  border: 1px solid #b6b5ff;
  background: rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 10px 0px var(--primary-solid-light, rgba(199, 125, 181, 0.5));
  padding: 10px 0;
`
const ReviewPostButton = styled.div`
  text-align: center;
  text-shadow: 0px 0px 10px var(--primary-solid, #c77db5);
  cursor: pointer;

  /* regular/md */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  background: linear-gradient(91deg, #b6b5ff 0%, #ffd7d7 99.7%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
const ReviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`
