import { Button, Input, Textarea } from "@material-tailwind/react";

export default function Component() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center">
      <div className="container px-4 md:px-6">
        <div className="space-y-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Have a question or need assistance? Fill out the form below and our team will get back to you as soon as
            possible.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-md space-y-4">
          <form className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name">Name</label>
                <Input crossOrigin={"origin"} id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email">Email</label>
                <Input crossOrigin={"origin"} id="email" placeholder="Enter your email" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="phone">Phone</label>
              <Input crossOrigin={"origin"} id="phone" placeholder="Enter your phone number" />
            </div>
            <div className="space-y-2">
              <label htmlFor="message">Message</label>
              <Textarea className="min-h-[100px]" id="message" placeholder="Enter your message" />
            </div>
            <Button placeholder={""} color="red" variant="outlined" className="w-full">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}