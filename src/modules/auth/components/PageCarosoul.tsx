import { Carousel, Typography } from "@material-tailwind/react";

export function AuthPageCarousel() {
    return (
        <Carousel className="rounded-xl" placeholder={undefined} autoplay loop> 
            <div className="relative h-full w-full">
                <img
                    src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                    alt="image 2"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
                    <div className="w-full px-20 flex flex-col items-center">
                        <Typography
                            variant="h1"
                            color="white"
                            className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                            placeholder={undefined}
                        >
                            The Beauty of Nature
                        </Typography>
                        <Typography
                            variant="lead"
                            color="white"
                            className="mb-12 opacity-80 text-wrap text-center text-white"
                            placeholder={undefined}
                        >
                            It is not so much for its beauty that the forest
                            makes a claim upon men&apos;s hearts, as for that
                            subtle something, that quality of air that emanation
                            from old trees, that so wonderfully changes and
                            renews a weary spirit.
                        </Typography>
                    </div>
                </div>
            </div>
        </Carousel>
    );
}
