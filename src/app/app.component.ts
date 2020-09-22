import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public content = '';
  comments: { name: string; content: string }[] = [
    { name: 'Suzuki Taro', content: '１つ目のコメントです。' },
    { name: 'Suzuki Taro', content: '２つ目のコメントです。' },
    { name: 'Suzuki Taro', content: '３つ目のコメントです。' },
  ];
}
