'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useCompletion } from 'ai/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, GithubIcon } from 'lucide-react'

import { ThemeToggle } from '@/components/theme-toggle'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { NumberList } from '@/components/ui/number'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/seprator'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { fontSansCD } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { formSchema } from '@/lib/formSchema'

interface FormData {
  mode: string
  description: string
  tone: string
  characters: number
  creativity: string
}

export default function Home() {
  // Local States
  const [body, setBody] = useState<FormData | {}>({})

  // Generated Content Ref for scrolling
  const targetRef = useRef<null | HTMLHeadingElement>(null)

  const scrollTo = () => {
    console.log(targetRef.current)

    if (targetRef.current !== null) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  // Vercel AI SDK
  const { completion, complete, isLoading } = useCompletion({
    api: '/api/completion',
    body: body,
    onResponse(response) {
      scrollTo()
    },
  })

  // React Hook Form
  const form = useForm<FormData>({
    defaultValues: {
      mode: 'bio',
      description: '',
    },
    resolver: zodResolver(formSchema),
  })

  const { errors, isSubmitting } = form.formState

  // Functions
  const onSubmit = async (data: FormData) => {
    try {
      const { description, ...otherData } = data
      setBody(otherData)
      await complete(description)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="max-w-2xl mx-auto w-full px-4 flex h-16 justify-between items-center">
        <h1
          className={cn(
            'text-xl font-semibold font-sans-cd',
            fontSansCD.variable
          )}
        >
          DevGenie
        </h1>
        <div className="flex gap-4 items-center">
          <ThemeToggle />
          <Link href={'/login'} className={buttonVariants({ size: 'sm' })}>
            Login
          </Link>
        </div>
      </nav>
      <Separator />

      {/* Header component */}
      <header className="flex max-w-2xl px-1 mx-auto pt-8 pb-12 sm:py-12 md:py-16 flex-col justify-center items-center text-center">
        <Link href={'https://github.com/canwebe/devGenie'} target="_blank">
          <Badge
            variant={'outline'}
            className="shadow-md rounded-full font-medium text-sm py-2 px-4 hover:cursor-pointer hover:bg-muted"
          >
            <GithubIcon size={14} className="mr-2" />
            <p>Star on GitHub</p>
          </Badge>
        </Link>
        <h1
          className={cn(
            'text-3xl min-[520px]:text-4xl sm:text-5xl tracking-wide font-sans-cd font-extrabold mt-6',
            fontSansCD.variable
          )}
        >
          Craft a Standout Profile with AI Assistance
        </h1>
        <p className="text-primary/50 text-xs sm:text-sm px-[3.5px] md:text-md mt-3">
          Stand out from the crowd effortlessly. Our AI-driven platform helps
          you create compelling profiles, project descriptions, and experiences
          that showcase your skills and expertise.
        </p>
      </header>

      <main className="max-w-2xl w-full px-4 mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            {/* Select mode component */}
            <FormField
              control={form.control}
              name="mode"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel className="flex gap-3 items-center mb-3">
                    <NumberList className={errors?.mode ? 'bg-red-800' : ''}>
                      1
                    </NumberList>
                    Select a mode
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Profile Bio" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="bio">Profile Bio</SelectItem>
                        <SelectItem value="project">
                          Project Description
                        </SelectItem>
                        <SelectItem value="experience">
                          Experience Description
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Description component */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel className="flex gap-3 items-center mb-3">
                    <NumberList
                      className={errors?.description ? 'bg-red-800' : ''}
                    >
                      2
                    </NumberList>
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-24"
                      placeholder="Enter your description..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Select component for Tone & creativity */}
            <Label className="flex gap-3 items-center mb-3">
              <NumberList>3</NumberList>
              Fine tunning
            </Label>
            <div className="flex mt-2 mb-6 tems-center gap-4">
              {/* Select tone component */}
              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Tone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel className="px-[25px] text-sm leading-[25px] font-light">
                            Tone
                          </SelectLabel>
                          <SelectSeparator />
                          <SelectItem value="professional">
                            Professional
                          </SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="funny">Funny</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Select creativity component */}
              <FormField
                control={form.control}
                name="creativity"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Creativity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel className="text-sm leading-[25px] font-light">
                            Creativity
                          </SelectLabel>
                          <SelectSeparator />
                          <SelectItem value="0">No (Factual)</SelectItem>
                          <SelectItem value="0.5">Low</SelectItem>
                          <SelectItem value="0.9">Medium</SelectItem>
                          <SelectItem value="1.5">High</SelectItem>
                          <SelectItem value="2">Highest (Random)</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Slider component */}
            <FormField
              control={form.control}
              name="characters"
              render={({ field }) => (
                <FormItem className="mt-2 mb-12">
                  <FormLabel className="mb-5 block">Characters</FormLabel>
                  <FormControl>
                    <Slider
                      defaultValue={[200]}
                      min={160}
                      max={300}
                      onValueCommit={(e) => field.onChange(e[0])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Submit button */}
            <Button
              disabled={isLoading || isSubmitting}
              type="submit"
              size={'lg'}
              className="w-full"
            >
              {isLoading || isSubmitting ? (
                'Generating'
              ) : (
                <>
                  Generate
                  <ArrowRight size={14} className="ml-1" />
                </>
              )}
            </Button>
          </form>
        </Form>
        {/* Generate div */}

        <output className="flex flex-col space-y-10 mt-10">
          {completion ? (
            <>
              <h2
                ref={targetRef}
                className={cn(
                  'sm:text-4xl min-[520px]:text-3xl text-2xl font-semibold tracking-wide text-foreground mx-auto font-sans-cd',
                  fontSansCD.variable
                )}
              >
                Your generated bio
              </h2>
              <div
                title="Click to copy"
                className="rounded-xl shadow-md p-4 hover:bg-muted/50 transition cursor-copy border"
                // onClick={() => {
                // 	navigator.clipboard.writeText("i");
                // }}
              >
                <p>{completion}</p>
              </div>
            </>
          ) : null}
        </output>
      </main>
      <Separator className="sm:mt-22 mt-16" />
      <footer className="text-center max-w-2xl mx-auto h-16 sm:h-20 w-full sm:pt-2 pt-4 flex sm:flex-row flex-col justify-center items-center px-3 space-y-3 sm:mb-0 mb-3">
        <p className="font-light">
          Powered by{' '}
          <Link className="font-bold" href={'https://cohere.com/'}>
            Cohere
          </Link>{' '}
          and{' '}
          <Link className="font-bold" href={'https://sdk.vercel.ai/docs'}>
            Vercel AI SDK
          </Link>
        </p>
      </footer>
    </div>
  )
}
