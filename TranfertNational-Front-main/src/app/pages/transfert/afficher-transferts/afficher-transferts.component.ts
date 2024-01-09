import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Client } from 'src/app/model/Client.model';
import { Transfert } from 'src/app/model/Transfert.model';
import { ClientServiceService } from 'src/app/services/client-service.service';

@Component({
  selector: 'app-afficher-transferts',
  templateUrl: './afficher-transferts.component.html',
  styleUrls: ['./afficher-transferts.component.css']
})
export class AfficherTransfertsComponent implements OnInit {
  transfert:Transfert = new Transfert();
  client:Client = new Client();

  constructor(private message: NzMessageService,private clientService:ClientServiceService) { }

  ngOnInit() {
    var getUser = sessionStorage.getItem("user");
    this.client=JSON.parse(getUser);
    let resp=this.clientService.getTransferts();
    resp.subscribe((data :Transfert[])=>{
      console.log(data);
      this.listOfData=data;
      this.listOfDisplayData=data;
    })
  }
  searchValue = '';
  visible = false;
  visible2 = false;

  listOfData = [];
  listOfDisplayData = [...this.listOfData];
  isVisible = false;
  isVisible2= false;
  isVisible3= false;

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  showModal(transfert:Transfert): void {
    this.transfert=transfert;
    this.isVisible = true;
    
  }

  handleOk(): void {
    const id = this.message.loading('Action in progress..', { nzDuration: 0 }).messageId;
    setTimeout(() => {
      this.message.remove(id);
    }, 2500);

    this.clientService.servirTransfert(this.transfert).subscribe((response)=>{
      setTimeout(() => {
        this.message.remove(id);
      }, 0)
      if(response == "Le transfert a été bien servi"){
        this.message.success(response, { nzDuration: 2000 });
   
       }else this.message.warning(response, { nzDuration: 2500 });
      this.startShowMessages(response);
      window.location.reload();
    },err=>{
        this.message.error("Erreur d'envoi")
    }
      )
    this.isVisible2 = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  showModal2(transfert:Transfert): void {
    this.transfert=transfert;
    this.isVisible2 = true;
  }

  handleOk2(): void {
    const id = this.message.loading('Action in progress..', { nzDuration: 0 }).messageId;
    setTimeout(() => {
      this.message.remove(id);
    }, 2500);

    this.clientService.restituerTransfert(this.transfert).subscribe((response)=>{
      setTimeout(() => {
        this.message.remove(id);
      }, 0)
      this.startShowMessages(response);
      window.location.reload();
    },err=>{
        this.message.error("Erreur d'envoi")
    }
      )
    this.isVisible2 = false;
  }
  startShowMessages(response:string): void {
    
    if(response == "Le transfert a été restitué"){
     this.message.success(response, { nzDuration: 2000 });

    }else this.message.warning(response, { nzDuration: 2500 });
     
  
}
startShowMessagesExtourne(response:string): void {
    
  if(response == "Le transfert a été bien extourné"){
   this.message.success(response, { nzDuration: 2000 });
   window.location.reload();

  }else this.message.warning(response, { nzDuration: 2500 });
   

}
  handleCancel2(): void {
    console.log('Button cancel clicked!');
    this.isVisible2 = false;
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item) => item.reference.indexOf(this.searchValue) !== -1);
  }

  handleCancel3(): void {
    console.log('Button cancel clicked!');
    this.isVisible3= false;
  }

  showModal3(transfert:Transfert): void {
    this.transfert=transfert;
    this.isVisible3 = true;
  }

  handleOk3(): void {
    const id = this.message.loading('Action in progress..', { nzDuration: 0 }).messageId;
    setTimeout(() => {
      this.message.remove(id);
    }, 2500);

    this.clientService.extournerTranfert(this.transfert).subscribe((response)=>{
      console.log(response);
      setTimeout(() => {
        this.message.remove(id);
      }, 0)
      this.startShowMessagesExtourne(response);
    },err=>{
        this.message.error("Erreur d'envoi")
    }
      )
    this.isVisible2 = false;
  }
}
