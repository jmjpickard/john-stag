import { Head } from "next/document";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/components/ui/use-toast";
import TroutSVG from "~/svg/Trout";
import { api } from "~/utils/api";

const Game = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { gameId, playerId } = router.query;
  const gameIdStr = (gameId as string) ?? "";
  const playerIdStr = (playerId as string) ?? "";

  const { data, isLoading, refetch } = api.game.get.useQuery({
    id: gameIdStr,
  });

  const addPoints = api.game.addPoints.useMutation({
    onMutate: () =>
      toast({
        title: "Adding fishy points!...",
        description: "Please wait a moment",
      }),
    onSuccess: () => {
      refetch();
      toast({
        title: "Points added!",
        description: "Let's get fishing!",
      });
    },
  });
  const onAddPoints = (points: number) => {
    addPoints.mutate({
      playerId: playerIdStr,
      points,
    });
  };
  return (
    <>
      <main className="font-arcade bg-custom flex min-h-screen flex-col items-center justify-center">
        {!isLoading && (
          <div className="flex flex-col items-center justify-center gap-10">
            <div className="text-default text-3xl">{data?.title}</div>
            <div className="flex flex-row gap-5">
              <Button variant="default" onClick={() => onAddPoints(3)}>
                Trout!
              </Button>
              <Button variant="secondary" onClick={() => onAddPoints(1)}>
                Grayling!
              </Button>
            </div>
          </div>
        )}
        <Toaster />
      </main>
    </>
  );
};

export default Game;
