import BackgroundContainer from '@/components/common/BackgroundContainer'
import Profile from './Profile'
import ReviewCard from './ReviewCard'

//temp data
const reviewCount = 32
const imageText = '헤헷 거마워 헤헷'

function MyPage() {
  return (
    <>
      {/* <BackgroundContainer imageUrl='/images/Background/webBackground.png'> */}
      <BackgroundContainer>
        <Profile />
        <ReviewTitleWrap>
          <ReviewTitle>리뷰({reviewCount})</ReviewTitle>
        </ReviewTitleWrap>
        <GalleryContainer>
          <ImageSlideWrap>
            <ImageSlide imageUrl='https://img.cgv.co.kr/Movie/Thumbnail/StillCut/000088/88847/88847231277_727.jpg'>
              <ImageText>{imageText}</ImageText>
            </ImageSlide>
          </ImageSlideWrap>
        </GalleryContainer>
        <ReviewContainer>
          <ReviewCard />
        </ReviewContainer>
      </BackgroundContainer>
    </>
  )
}

export default MyPage
import styled from 'styled-components'
export const ReviewTitleWrap = styled.div`
  margin-top: 20px;
  padding-left: 20px;
`
export const ReviewTitle = styled.div`
  color: var(--gray-200, #e4e4e7);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  line-height: 30px;
`
export const GalleryContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`
export const ImageSlideWrap = styled.div`
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
`
export const ImageSlide = styled.div`
  position: relative;
  border-radius: 5px;
  width: 200px;
  height: 200px;
  background: url(${(props) => props.imageUrl}) lightgray 50% / cover no-repeat;
`

export const ImageText = styled.div`
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

export const ReviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-top: 20px;
`
