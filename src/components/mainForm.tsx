'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useCompletion } from 'ai/react'
import { ArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useSpinDelay } from 'spin-delay'
import { z } from 'zod'

import { Separator } from './ui/seprator'
import { fontSansCD } from '@/lib/fonts'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
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
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'

import { SpinnerDots } from './icons'
import { useAuth } from '@/contexts/firebaseContext'
import { incrementGenerateCount } from '@/lib/firebaseHelper'
import { formSchema } from '@/lib/formSchema'
import { formDefaultValue, placeholderObj } from '@/lib/data'

type formData = z.infer<typeof formSchema>

export default function MainForm() {
  // Auth Data
  const { user, isAuthReady } = useAuth()

  // Generated Content ref for scrolling
  const targetRef = useRef<null | HTMLElement>(null)

  // Scrolling to Response Generated
  const scrollToOutput = () => {
    setTimeout(() => {
      if (targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, 500)
  }

  // React Hook Form
  const form = useForm<formData>({
    defaultValues: formDefaultValue,
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
      uid: user?.uid || '127.0.0.1',
    },
    onResponse: (res) => {
      if (res.status === 429) {
        toast.error(
          'Oops! You have reached your max limit. Please try again 2 min later.'
        )
      }
      scrollToOutput()
    },
    onError: (error) => {
      console.log(error)
    },
    onFinish: () => {
      incrementGenerateCount()
    },
  })

  // Functions
  const onSubmit = async (data: formData) => {
    try {
      if (!user) {
        return toast.error('Please login to generate.')
      }
      await complete(data?.description)
    } catch (error) {
      console.log(error)
    }
  }

  // Spin delay for spinner
  const showSpinner = useSpinDelay(isLoading || isSubmitting)

  return (
    <>
      <main className="max-w-2xl w-full px-4 mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            {/* Mode select */}
            <FormField
              control={form.control}
              name="mode"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel className="flex gap-3 items-center mb-3">
                    <NumberList
                      className={cn(errors?.mode && 'bg-destructive')}
                    >
                      1
                    </NumberList>
                    Select a mode
                  </FormLabel>
                  <Select
                    onValueChange={(inputValue) => {
                      field.onChange(inputValue)
                      form.setValue('description', '')
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(errors?.mode && 'border-destructive')}
                      >
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

            {/* Description textarea */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel className="flex gap-3 items-center mb-3">
                    <NumberList
                      className={cn(errors?.description && 'bg-destructive')}
                    >
                      2
                    </NumberList>
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className={cn(
                        'h-24',
                        errors?.description && 'border-destructive'
                      )}
                      placeholder={
                        placeholderObj[form.watch('mode')] ||
                        'Enter Description....'
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tone & creativity */}
            <Label className="flex gap-3 items-center mb-3">
              <NumberList>3</NumberList>
              Fine tunning
            </Label>
            <div className="flex mt-2 mb-6 tems-center gap-4">
              {/* Tone select */}
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

              {/* Creativity select */}
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

            {/* Character range input */}
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
              disabled={showSpinner || !isAuthReady}
              type="submit"
              size={'lg'}
              className="w-full"
            >
              {showSpinner ? (
                <SpinnerDots width={24} height={24} />
              ) : (
                <>
                  Generate
                  <ArrowRight size={14} className="ml-1" />
                </>
              )}
            </Button>
          </form>
        </Form>

        {/* Generated output */}
        <output className="flex flex-col space-y-10 mt-10">
          {completion ? (
            <>
              <h2
                className={cn(
                  'sm:text-4xl min-[520px]:text-3xl text-2xl font-semibold tracking-wide text-foreground mx-auto font-sans-cd',
                  fontSansCD.variable
                )}
              >
                Your generated bio
              </h2>
              <div
                tabIndex={0}
                title="Click to copy the content."
                className={cn(
                  'rounded-xl shadow-md p-4 hover:bg-muted/50 transition cursor-copy border',
                  'ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                )}
                onClick={() => {
                  navigator.clipboard.writeText(completion)
                  return toast.success('Copied to clipboard successfullly.')
                }}
                onKeyDown={(value) => {
                  if (value.key === 'Enter' || value.key === ' ') {
                    navigator.clipboard.writeText(completion)
                    return toast.success('Copied to clipboard successfullly.')
                  }
                }}
              >
                <p className="break-words">{completion}</p>
              </div>
            </>
          ) : null}
        </output>
      </main>
      <Separator className="sm:mt-16 mt-14" />
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
