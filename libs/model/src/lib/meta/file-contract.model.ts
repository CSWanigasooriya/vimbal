export interface FileContract {
  id: number
  hash: string
  fileName: string
  title: string
  authors: string
  keywords: string
  description: string
  tipAmount: number
  createdAt: string
  owner: number
}

export type FileContractWrapper = FileContract & {
  averageRating: number
}
