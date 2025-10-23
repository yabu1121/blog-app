import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deletePost } from "@/lib/actions/deletePost";

type DeletePostProps = {
  postId : string;
  isOpen : boolean;
  onOpenChange : (open : boolean) => void; 
}

const DeletePostDialog = ({postId, isOpen, onOpenChange} : DeletePostProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>記事の削除</AlertDialogTitle>
          <AlertDialogDescription>この記事を削除してもよろしいですか?<br />この操作は取り消せません。</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={() => {deletePost(postId)}}>削除</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    )
}

export default DeletePostDialog