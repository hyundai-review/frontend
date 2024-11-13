import BackgroundContainer from '@/components/common/BackgroundContainer'
import Stories from '@/components/story/Stories'
import Profile from './Profile'
import ReviewCard from './ReviewCard'
import { myReviewData } from '@/assets/data/myReviewData'
import { transformReviewData } from '@/utils/dataTransform'
import { useEffect } from 'react'
import styled from 'styled-components'
import ReviewSwiper from '@/components/reviewSwiper/ReviewSwiper'

// myReviewData에서 데이터를 변환
function MyPage() {
  const transformedData = transformReviewData(myReviewData)
  useEffect(() => {
    console.log(transformedData)
  }, [])
  return (
    <>
      <BackgroundContainer>
        <Profile />
        <ReviewTitleWrap>
          <ReviewTitle>리뷰({transformedData[0].commentCount})</ReviewTitle>
        </ReviewTitleWrap>
        {/* TODO(k) 경로설정 */}
        {/* <Stories dataList={transformedData} path={'/mypage'} /> */}
        <ReviewSwiper dataList={transformedData} path={'/mypage'} />
        <ReviewContainer>
          {/* <ReviewCard /> */}
          {transformedData.map((review) => (
            <ReviewCard key={review.movieId} review={review} />
          ))}
        </ReviewContainer>
      </BackgroundContainer>
    </>
  )
}

export default MyPage
const ReviewTitleWrap = styled.div`
  margin-top: 20px;
  padding-left: 20px;
`
const ReviewTitle = styled.div`
  color: var(--gray-200, #e4e4e7);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  line-height: 30px;
`
const ImageSlideWrap = styled.div`
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
`
const ImageSlide = styled.div`
  position: relative;
  border-radius: 5px;
  width: 200px;
  height: 200px;
  background: url(${(props) => props.imageUrl}) lightgray 50% / cover no-repeat;
`

const ImageText = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  padding: 4px 10px;
  margin: 0 auto;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
`

const ReviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-top: 20px;
`
