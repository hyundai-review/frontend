import BackgroundContainer from '@/components/common/BackgroundContainer'
import Stories from '@/components/story/Stories'
import Profile from './Profile'
import ReviewCard from '../../components/review/ReviewCard'
import { myReviewData } from '@/assets/data/myReviewData'
import { transformReviewData } from '@/utils/dataTransform'
import { useEffect } from 'react'
import styled from 'styled-components'
import ReviewSwiper from '@/components/reviewSwiper/ReviewSwiper'
import useNavigateStore from '@/store/navigateStore'
// myReviewData에서 데이터를 변환
function MyPage() {
  const transformedData = transformReviewData(myReviewData)
  const setNavigatePage = useNavigateStore((state) => state.setNowPage)
  useEffect(() => {
    console.log(transformedData)
    setNavigatePage(2)
  }, [setNavigatePage])
  return (
    <>
      <Profile />
      <div style={{ paddingLeft: '20px' }}>
        <ReviewTitleWrap>
          <ReviewTitle>리뷰({transformedData[0].commentCount})</ReviewTitle>
        </ReviewTitleWrap>
        {/* TODO(k) 경로설정 */}
        {/* <Stories dataList={transformedData} path={'/mypage'} /> */}
        <ReviewSwiper dataList={transformedData} path={'/mypage'} />
        <ReviewContainer>
          {/* <ReviewCard /> */}
          {transformedData.map((review) => (
            <ReviewCard pageType='mypage' key={review.movieId} review={review} />
          ))}
        </ReviewContainer>
      </div>
    </>
  )
}

export default MyPage
const ReviewTitleWrap = styled.div`
  margin-top: 20px;
`
const ReviewTitle = styled.div`
  color: var(--gray-200, #e4e4e7);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  line-height: 30px;
`
const ReviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding-right: 20px;
  gap: 10px;
`
