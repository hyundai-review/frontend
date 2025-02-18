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
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import useNavigateStore from '@/store/navigateStore'
import { set } from 'lodash'
import { PuffLoader } from 'react-spinners'
// myReviewData에서 데이터를 변환
function MyPage() {
  // ----------------------  API 요청 ----------------------
  const { get, loading } = useApi(true)
  const [hasNext, setHasNext] = useState(true) // 다음 페이지 여부
  const [totalReviewCount, setTotalReviewCount] = useState(0)

  // 데이터를 가져오는 함수
  const fetchMyReviews = async (page) => {
    const response = await get(`/reviews/my?page=${page}&size=10&sort=date`)
    setTotalReviewCount(response.data.totalReviews)
    setHasNext(response.data.pageable.hasNext) // 다음 페이지 여부 업데이트
    return response.data.contents
  }

  const { data, observerRef } = useInfiniteScroll(fetchMyReviews, hasNext, loading)

  // const [data, setData] = useState([])
  const transformedData = transformMyReviewData(data)
  // myReviewData에서 데이터를 변환
  // const transformedData = transformReviewData(myReviewData)
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
          <ReviewTitle>리뷰({totalReviewCount})</ReviewTitle>
        </ReviewTitleWrap>
        <ReviewSwiper dataList={transformedData} path={'/mypage'} />
        <ReviewContainer>
          {transformedData.map((review) => (
            <ReviewCard pageType='mypage' key={review.movieId} review={review} />
          ))}
        </ReviewContainer>
        <div ref={observerRef} style={{ height: '20px' }} />
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
