import { Box, Card, CardContent, Rating, Typography } from "@mui/material";
import "react-multi-carousel/lib/styles.css";
import CardMediaCarousel from "./CardMediaCarousel";

interface RoomCardProps {
    id: number;
    name?: string;
    type?: string;
    price_per_night?: number;
    max_users?: number;
    num_beds?: number;
    images?: string[];
    onReserve?: (roomId: number) => void;
}

const RoomsCard = ({
    id,
    name = "Habitación",
    type,
    price_per_night,
    max_users,
    num_beds,
    images = [],
}: RoomCardProps) => {
    return (
        <Box sx={{ width: "100%", maxWidth: 420, }}>
            <Card sx={{
                display: 'flex',
                width: "100%",
                border: "1px solid #ddd",
                borderRadius: "15px",
                minHeight: 240,
                m: 2
            }}>
                <CardMediaCarousel id={id} images={images} />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <CardContent>
                        <Typography variant="h5">{name}</Typography>
                        <Typography variant="body2">{type}</Typography>

                        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                            <Typography variant="body2">
                                {(max_users ?? 0)} {(max_users ?? 0) > 1 ? "huéspedes" : "huésped"}
                            </Typography>
                            <Typography variant="body2">
                                {(num_beds ?? 0)} {(num_beds ?? 0) > 1 ? "camas" : "cama"}
                            </Typography>                        </Box>

                        <Typography sx={{
                            mt: 1,
                            fontSize: 22,
                            color: "#0071c2",
                            fontWeight: 700,
                        }}>
                            ${price_per_night}
                            <Typography component="span" sx={{ fontSize: 14, color: "gray" }}>
                                /noche
                            </Typography>
                        </Typography>

                        <Box sx={{ mt: 1 }}>
                            <Rating name="read-only" value={4.5} precision={0.5} readOnly size="small" />
                        </Box>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    )
}


export default RoomsCard
