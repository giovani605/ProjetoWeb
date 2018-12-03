import { Component, OnInit } from "@angular/core";
import { FeedItem } from "../../model/feedItem.model";
import { FeedService } from "src/app/services/feed.service";
import { Subject, Subscription } from "rxjs";
import { PratoService } from "src/app/services/prato.service";
import { Tag } from "src/app/model/tag.model";
import { Cidade } from "src/app/model/cidade.model";
import { LocalizacaoService } from "src/app/services/localizacao.service";
import { UserService } from "src/app/services/user.service";
@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.css"]
})
export class FeedComponent implements OnInit {
  // lista do feed
  lista: FeedItem[] = [];
  public listaTags: Tag[] = [];
  public listaCidades: Cidade[] = [];
  public cidadeSelecionada: string = "selecione";
  public idCidadeSelecionada: number = 0;

  constructor(
    private feedService: FeedService,
    private pratoService: PratoService,
    private localizaoService: LocalizacaoService,
    private userService: UserService
  ) {}

  ngOnInit() {
    var a: Subscription = this.feedService
      .recuperarFeedGeral()
      .subscribe(dados => {
        this.lista = dados;
        a.unsubscribe();
      });

    const subs2: Subscription = this.pratoService
      .recuperarTodasTag()
      .subscribe(dados => {
        this.listaTags = dados;
        subs2.unsubscribe();
      });

    var subs: Subscription = this.localizaoService
      .getCidadesObs()
      .subscribe(dados => {
        this.listaCidades = dados;
        subs.unsubscribe();
      });

    this.userService.carregarAmigos();
  }
  changeCidade(cidade) {
    this.idCidadeSelecionada = cidade.idCidade;
    this.cidadeSelecionada = cidade.nome;
    console.log(cidade.idCidade);
  }

  atualizarFeed() {
    console.log("atualizar feed");
    const a: Subscription = this.feedService
      .recuperarFeedFiltro(this.listaTags, this.idCidadeSelecionada)
      .subscribe(dados => {
        this.lista = dados;
        a.unsubscribe();
      });
  }

  ngOnDestroy() {}
}
