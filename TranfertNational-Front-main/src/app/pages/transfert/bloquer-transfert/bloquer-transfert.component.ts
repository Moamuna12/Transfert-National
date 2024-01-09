import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Transfert } from 'src/app/model/Transfert.model';
import { ClientServiceService } from 'src/app/services/client-service.service';

@Component({
  selector: 'app-bloquer-transfert',
  templateUrl: './bloquer-transfert.component.html',
  styleUrls: ['./bloquer-transfert.component.css']
})
export class BloquerTransfertComponent implements OnInit {
  transfert:Transfert = new Transfert();
  constructor(private message: NzMessageService,private clientService:ClientServiceService) { }

  ngOnInit() {
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

    this.clientService.bloquerTranfert(this.transfert).subscribe((response)=>{
      console.log(response);
      setTimeout(() => {
        this.message.remove(id);
      }, 0)
      this.startShowMessages(response);
      window.location.reload();
    },err=>{
        this.message.error("Erreur d'envoi")
    }
      )
    this.isVisible2 = false;    this.isVisible = false;
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

    this.clientService.debloquerTranfert(this.transfert).subscribe((response)=>{
      setTimeout(() => {
        this.message.remove(id);
      }, 0)
      this.startShowMessages2(response);
      window.location.reload();

    },err=>{
        this.message.error("Erreur d'envoi")
    }
      )
    this.isVisible2 = false;
  }
  startShowMessages2(response:string): void {
    
    if(response == "Le transfert est débloqué."){
     this.message.success(response, { nzDuration: 2000 });

    }else this.message.warning(response, { nzDuration: 2500 });
}
startShowMessages(response:string): void {
    
  if(response == "Le transfert est bloqué."){
   this.message.success(response, { nzDuration: 2000 });

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

 

}
