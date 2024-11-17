import BackgroundContainer from '@/components/common/BackgroundContainer'
import Stories from '@/components/story/Stories'
import Profile from './Profile'
import ReviewCard from '../../components/review/ReviewCard'
import { myReviewDataTest } from '@/assets/data/myReviewData'
import { transformMyReviewData } from '@/utils/dataTransform'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import ReviewSwiper from '@/components/reviewSwiper/ReviewSwiper'
import { useApi } from '@/libs/useApi'

// myReviewData에서 데이터를 변환
function MyPage() {
  // ----------------------  API 요청 ----------------------
  const { get } = useApi(true)
  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        const response = await get(`/reviews/my?page=0&size=10&sort=date`)
        setData(response.data.contents)
        console.log(response.data.contents)
      } catch (err) {
        console.error('내 리뷰 정보를 가져오는 중 오류가 발생했습니다:', err)
      }
    }
    fetchMyReviews()
  }, [])
  const [data, setData] = useState([])
  const transformedData = transformMyReviewData(data)
  useEffect(() => {
    console.log(transformedData)
  }, [])
  return (
    <>
      <Profile />
      <div style={{ paddingLeft: '20px' }}>
        <ReviewTitleWrap>
          <ReviewTitle>리뷰(999)</ReviewTitle>
        </ReviewTitleWrap>
        <ReviewSwiper dataList={transformedData} path={'/mypage'} />
        <ReviewContainer>
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
