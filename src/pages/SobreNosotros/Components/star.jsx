import { AiFillStar } from 'react-icons/ai';
import '../Style/Rating.css';

export function Rating({ rating }) {
  const fullStars = Math.round(rating);
  const partialStar = rating - fullStars;

  const starList = [];
  for (let i = 0; i < fullStars; i++) {
    starList.push(<AiFillStar key={i} style={{color: "#75E8E5"}}/>);
  }

  if (partialStar > 0) {
    const partialWidth = `${partialStar * 100}%`;
    starList.push(
      <div key={fullStars} className="partial-star" style={{ width: partialWidth }}>
        <AiFillStar/>
      </div>
    );
  }

  return <div className="rating" style={{textAlign: 'center'}}>{starList}</div>;
}