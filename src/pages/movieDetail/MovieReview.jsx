import { myReviewDataTest, reviewTest } from '@/assets/data/myReviewData'
import StarRating from '@/components/common/StarRating'
import ReviewSwiper from '@/components/reviewSwiper/ReviewSwiper'
import { transformReviewData } from '@/utils/dataTransform'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ReviewCard from '../../components/review/ReviewCard'
import MyReview from './MyReview'
import { useNavigate, useParams } from 'react-router-dom'
import { useApi } from '@/libs/useApi'

function MovieReview() {
  const navigate = useNavigate()
  // ---------------------------login---------------------------
  const [isLogin, setIsLogin] = useState(true)
  const { movieId } = useParams()
  const [isReviewWritten, setIsReviewWritten] = useState(false)
  const [transformedData, setTransformedData] = useState([])
  const [transformedFullData, setTransformedFullData] = useState([])
  // ---------------------------API---------------------------
  const { get, loading, error } = useApi(true) // 테스트중 true로 바꿔야함

  const [data, setData] = useState(null)
  const fetchReviewData = async () => {
    try {
      // TODO(k) 무한스크롤 페이지네이션 이후 추가해야함, 일단 빼고 진행
      const response = await get(`/reviews/${movieId}?page=0&size=10&sort=date`)
      setData(response.data)
      const repeatedData = Array(5) // 길이 5의 배열 생성
        .fill(response.otherReviewList) // 응답 데이터를 채워넣음
        .flat()

      setIsReviewWritten(response.data.myReview !== null)
      // console.log('movie review >>> ', response.data)
    } catch (err) {
      console.error('리뷰 정보를 가져오는 중 오류가 발생했습니다:', err)
    }
  }
  useEffect(() => {
    if (!isLogin) return // 로그인 상태가 아니면 추가 요청 생략
    fetchReviewData()
  }, [])

  useEffect(() => {
    if (data) {
      console.log('other reviewlist : ', data.otherReviewList)
      //TODO (k) 마이리뷰도 추가, 리뷰스와이퍼에다가도 데이터 길이

      const transformedOther = transformReviewData(data.otherReviewList)
      const myReview = data.myReview
      myReview.authorProfile = ''
      myReview.authorNickname = ''
      myReview.cardDate = ''
      transformedOther.unshift(myReview)

      setTransformedFullData(transformedOther)
      const transformed = transformReviewData(data.otherReviewList)
      setTransformedData(transformed) // 상태 업데이트
      // setTransformedData(transformedOther) // 상태 업데이트
    }
  }, [data])
  const onDataChange = () => {
    fetchReviewData() // 데이터 다시 요청
  }
  // useEffect(() => {
  //   console.log('transformedData : ', transformedData)
  // }, [transformedData])
  return (
    <Wrap>
      <TitleWrap>
        <Title>리뷰({data?.totalReviews})</Title>
        {isLogin && (
          <RatingWrap>
            <StarRating type='readonly' initialValue='1' max={1} size={24} />
            <AverageRating>{data?.averageRating.toFixed(2)}</AverageRating>
          </RatingWrap>
        )}
      </TitleWrap>
      {!isLogin ? (
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
            <ReviewSwiper dataList={transformedFullData} />
            {!isReviewWritten ? (
              <ButtonWrap
                className='hoverBright'
                onClick={() => navigate(`/review/${movieId}/post`)}
              >
                <ReviewPostButton>스토리 & 리뷰 작성하기</ReviewPostButton>
              </ButtonWrap>
            ) : (
              <ButtonWrap>
                <MyReview myReviewData={data?.myReview} onDataChange={onDataChange} />
              </ButtonWrap>
            )}
            <>
              <ReviewContainer>
                {transformedData?.map((review, index) => (
                  <ReviewCard pageType='movieDetail' key={index} review={review} />
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
