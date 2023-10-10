import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function Shimmer() {
  return (
    <main className="flex flex-col items-center justify-center w-full">
      <Stack spacing={1} className="overflow-hidden w-11/12 ">
        <Skeleton variant="text" width={400} sx={{ fontSize: "1rem" }} />
        <Skeleton variant="circular" width={50} height={50} />
        <Skeleton variant="rectangular" width={400} height={60} />
        <Skeleton variant="rounded" width={400} height={60} />
      </Stack>
      <Stack spacing={1} className="overflow-hidden w-11/12 ">
        <Skeleton variant="text" width={400} sx={{ fontSize: "1rem" }} />
        <Skeleton variant="circular" width={50} height={50} />
        <Skeleton variant="rectangular" width={400} height={60} />
        <Skeleton variant="rounded" width={400} height={60} />
      </Stack>
      <Stack spacing={1} className="overflow-hidden w-11/12 ">
        <Skeleton variant="text" width={400} sx={{ fontSize: "1rem" }} />
        <Skeleton variant="circular" width={50} height={50} />
        <Skeleton variant="rectangular" width={400} height={60} />
        <Skeleton variant="rounded" width={400} height={60} />
      </Stack>
    </main>
  );
}
