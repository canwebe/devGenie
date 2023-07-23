'use client'

import { ThemeToggle } from '@/components/theme-toggle'
import { Badge } from '@/components/ui/badge'
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
import { Separator } from '@/components/ui/seprator'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCompletion } from 'ai/react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'

import { GithubIcon, GoogleIcon } from '@/components/icons'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { fontSansCD } from '@/lib/fonts'
import { formSchema } from '@/lib/formSchema'
import { cn } from '@/lib/utils'
import { z } from 'zod'
import { useAuth } from '@/contexts/firebaseContext'

import Header from '@/components/header'
import MainForm from '@/components/mainForm'
import Nav from '@/components/nav'
import Insights from '@/components/insights'

export default function Home() {
  console.count('Re render')

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <Separator />
      <Header />
      <Insights />
      <MainForm />
      <Toaster richColors closeButton position="top-center" />
    </div>
  )
}
