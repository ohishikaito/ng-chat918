import { Component } from '@angular/core';
import { Comment, User } from './class/chat';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // 追加

const CURRENT_USER: User = new User(1, 'Tanaka Jiro'); // 自分のUser情報を追加
const ANOTHER_USER: User = new User(2, 'Suzuki Taro'); // 相手のUser情報を追加
// const COMMENTS: Comment[] = [
//   // クラスを元にコメントを作成
//   new Comment(ANOTHER_USER, 'Suzukiの１つ目のコメントです。'),
//   new Comment(ANOTHER_USER, 'Suzukiの2つ目のコメントです。'),
//   new Comment(CURRENT_USER, 'Tanakaの１つ目のコメントです。'),
//   new Comment(ANOTHER_USER, 'Suzukiの3つ目のコメントです。'),
//   new Comment(CURRENT_USER, 'Tanakaの2つ目のコメントです。'),
// ];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // item: Observable<Comment>;
  public content = '';
  // public comments = COMMENTS;
  public comments: Observable<Comment[]>;
  public currentUser = CURRENT_USER;

  constructor(private db: AngularFirestore) {
    // this.item = db.collection('comments').doc<Comment>('item').valueChanges();
    this.comments = db
      .collection<Comment>('comments', (ref) => {
        return ref.orderBy('date', 'asc');
      })
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((action) => {
            const data = action.payload.doc.data() as Comment;
            // console.log(data);
            const key = action.payload.doc.id;
            // console.log('key:' + key);
            const commentData = new Comment(data.user, data.content);
            // console.log(commentData);
            commentData.setData(data.date, key);
            // console.log('Commentdata2:' + commentData);
            return commentData;
          })
        )
      );
  }

  addComment(e: Event, comment: string) {
    e.preventDefault();
    if (comment) {
      this.db
        .collection('comments')
        .add(new Comment(this.currentUser, comment).deserialize());
      this.content = '';
    }
  }

  toggleEditComment(comment: Comment) {
    comment.editFlag = !comment.editFlag;
    // console.log(comment.editFlag);
  }

  saveEditComment(comment: Comment) {
    this.db
      .collection('comments')
      .doc(comment.key)
      .update({
        content: comment.content,
        date: comment.date,
      })
      .then(() => {
        console.log('更新したよん');
        comment.editFlag = false;
      });
  }

  resetEditComment(comment: Comment) {
    comment.content = '';
  }

  deleteComment(key: string) {
    this.db
      .collection('comments')
      .doc(key)
      .delete()
      .then(() => {
        console.log('削除ぉ！');
      });
  }
}
