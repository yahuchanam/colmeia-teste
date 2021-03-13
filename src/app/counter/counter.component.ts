import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SubSink } from 'subsink';
import { LetterCount } from '../model/letter-count.model';
import { WordCount } from '../model/word-count.model';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit, OnDestroy {

  subSink = new SubSink();

  book = new FormControl(
    'este é realmente um grande livro com mais de mil páginas sem acento e sem virgulas nem pontos e só minusculas'
  );

  palavras: string[] = [];
  letras: string[] = [];
  constructor() { }

  ngOnInit(): void {
    this.subSink.sink = this.book.valueChanges.subscribe(
      (book: string) => {
        const wordCount = new WordCount();
        const letterCount = new LetterCount();
        // Quantidade de palavras
        wordCount.count(book);
        this.palavras = wordCount.print();
        // Quantidade de letras
        letterCount.count(book);
        this.letras = letterCount.print();
      }
    );
    this.book.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
