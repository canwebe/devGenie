'use client'

import { fontSansCD } from '@/lib/fonts'
import { Separator } from './ui/seprator'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Slider } from './ui/slider'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { useAuth } from '@/contexts/firebaseContext'
import { formSchema } from '@/lib/formSchema'
import { z } from 'zod'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCompletion } from 'ai/react'
import { toast } from 'sonner'
import { NumberList } from './ui/number'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { incrementGenerateCount } from '@/utils/firebase-helper'

type formData = z.infer<typeof formSchema>

export default function MainForm() {
  // Auth Data
  const { user, isAuthReady } = useAuth()

  // Generated Content Ref for scrolling
  const targetRef = useRef<null | HTMLElement>(null)

  const scrollTo = () => {
    console.log(targetRef, 'log target ref')
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // React Hook Form
  const form = useForm<formData>({
    defaultValues: {
      mode: 'bio',
      description: '',
      characters: 200,
    },
    resolver: zodResolver(formSchema),
  })

  const { errors, isSubmitting } = form.formState

  // Vercel AI SDK
  const { completion, complete, isLoading } = useCompletion({
    body: {
      tone: form.getValues('tone') || 'professional',
      mode: form.getValues('mode'),
      characters: form.getValues('characters'),
      creativity: form.getValues('creativity') || '0.9',
    },
    onResponse: (res) => {
      if (res.status === 429) {
        toast.error('You are being rate limited. Please try again later.')
      }
      scrollTo()
    },
    onError: (error) => {
      toast.error('Something went wrong! Please try again later.')
      console.log(error)
    },
    onFinish: () => {
      toast.success('Generated Successfully')
      incrementGenerateCount()
    },
  })

  // Functions
  const onSubmit = async (data: formData) => {
    try {
      console.log('Form Data', data)
      if (!user) {
        toast.error('You need to login first')
        return
      }
      await complete(data?.description)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
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
                    <NumberList
                      className={errors?.mode ? 'bg-destructive' : ''}
                    >
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
                      className={errors?.description ? 'bg-destructive' : ''}
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
                      defaultValue={[field.value]}
                      min={160}
                      max={300}
                      onValueCommit={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Submit button */}
            <Button
              disabled={isLoading || isSubmitting || !isAuthReady}
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
                // ref={targetRef}
                className={cn(
                  'sm:text-4xl min-[520px]:text-3xl text-2xl font-semibold tracking-wide text-foreground mx-auto font-sans-cd',
                  fontSansCD.variable
                )}
              >
                Your generated bio
              </h2>
              {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
              <div
                title="Click to copy"
                className="rounded-xl shadow-md p-4 hover:bg-muted/50 transition cursor-copy border"
                onClick={() => {
                  navigator.clipboard.writeText(completion)
                  toast.success('Successfully! copied to clipboard')
                }}
              >
                <p className="break-words">{completion}</p>
              </div>
            </>
          ) : null}
        </output>
      </main>
      <Separator className="sm:mt-22 mt-16" />
      <footer
        ref={targetRef}
        className="text-center text-sm max-w-2xl mx-auto h-16 sm:h-20 w-full sm:pt-2 pt-4 flex sm:flex-row flex-col justify-center items-center px-3 space-y-3 sm:mb-0 mb-3"
      >
        <p>
          Developed by{' '}
          <a
            className="font-bold underline"
            href="https://canwebe.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CanWeBe!
          </a>{' '}
          with{' '}
          <a
            className="font-bold underline"
            href="https://cohere.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cohere
          </a>
        </p>
      </footer>
    </>
  )
}
