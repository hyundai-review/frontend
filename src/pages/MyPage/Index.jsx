import BackgroundContainer from '@/components/common/BackgroundContainer'
import * as S from '@/styles/MyPage/MyPage.style'
import Profile from './Profile'
import ReviewCard from './ReviewCard'

//temp data
const nickname = '아보카도파김치'
const reviewCount = 32
const imageText = '헤헷 거마워 헤헷'
const reviewContent =
  '이 영화는 정말 재밌었어요! 이 영화는 정말 재밌었어요! 이 영화는 정말 재밌었어요! 이 영화는 정말 재밌었어요! 이 영화는 정말 재밌었어요!'
const commentCount = 13
const cardDate = '2024.11.09'
const rating = 4 // 별점
const movie = '청설'
function MyPage() {
  return (
    <>
      <BackgroundContainer imageUrl='/Background/mobileBackground2.png'>
        <Profile />
        <S.ReviewTitleWrap>
          <S.ReviewTitle>리뷰({reviewCount})</S.ReviewTitle>
        </S.ReviewTitleWrap>
        <S.GalleryContainer>
          <S.ImageSlideWrap>
            <S.ImageSlide imageUrl='https://img.cgv.co.kr/Movie/Thumbnail/StillCut/000088/88847/88847231277_727.jpg'>
              <S.ImageText>{imageText}</S.ImageText>
            </S.ImageSlide>
          </S.ImageSlideWrap>
        </S.GalleryContainer>
        <S.ReviewContainer>
          <ReviewCard />
        </S.ReviewContainer>
      </BackgroundContainer>
    </>
  )
}

export default MyPage
