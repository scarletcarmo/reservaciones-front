import { CardMedia } from '@mui/material';
import Carousel from 'react-multi-carousel';

interface CardMediaProps {
    id: number,
    images: string[]
}

const CardMediaCarousel = ({ id, images }: CardMediaProps) => {

    const responsive = {
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    };

    return (
        <div style={{ width: 220, height: "100%" }}> 
            <Carousel responsive={responsive}>
                {images.map((img, index) => (
                    <CardMedia
                        key={index}
                        component="img"
                        image={img}
                        alt={`img-room-${id}-${index}`}
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "12px 0 0 12px",
                        }}
                    />
                ))}
            </Carousel>
        </div>
    );
};

export default CardMediaCarousel;
