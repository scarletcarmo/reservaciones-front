import { Box, Card, CardContent, CardHeader, CardMedia, Rating, Typography } from "@mui/material";

interface RoomCardProps {
    id: number;
    name?: string;
    type?: string;
    price_per_night?: number;
    max_users?: number;
    num_beds?: number;
    image?: string;
    onReserve?: (roomId: number) => void;
}

const RoomsCard = ({
    id,
    name = "Habitación",
    type,
    price_per_night,
    max_users,
    num_beds,
    image,
    onReserve,
}: RoomCardProps) => {
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
            }}
        >
            <Box sx={{ width: "80%" }}>
                <Card
                    sx={{ display: 'flex' }}
                >
                    {/**IMAGEN */}
                    <CardMedia
                        component="img"
                        sx={{ width: 240, objectFit: "cover" }}
                        image={
                            image ||
                            "https://images.unsplash.com/photo-1618773928121-c32242e63f88?w=900&q=80"
                        }
                        alt={name}
                    />

                    {/**CONTENIDO */}
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{
                            flex: '1'
                        }}>
                            <Typography
                                variant="h5"
                            >
                                {name}
                            </Typography>
                            <Typography variant="body2">
                                {type}
                            </Typography>
                            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                                <Typography variant="body2"> {max_users} huéspedes</Typography>
                                <Typography variant="body2"> {num_beds} camas</Typography>
                            </Box>

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
                                <Typography variant="body2" sx={{ ml: 1, display: "inline" }}>
                                    Excelente
                                </Typography>
                            </Box>
                        </CardContent>
                    </Box>
                </Card>
            </Box>

        </Box>

    )
}

export default RoomsCard
