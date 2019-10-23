import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MappingService } from 'src/app/services/mapping.service';

@Component({
  selector: 'app-template',
  templateUrl: './minisite.component.html',
  styleUrls: ['./minisite.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinisiteComponent implements OnInit {
  itinerary: any;
  showMobileMenu: boolean;
  youtubeSource:string;
  markers: any[];
  total: any;
  reservation: any;
  airport: any;
  consultants:any[];
  finalConsultants:string[] = new Array();
  consultname :any;
  text : any;
  consultData: any;
  socialLinks: { facebook: string; instagram: string; whatsapp: string; email: string; };
  constructor(private _activatedRoute: ActivatedRoute,private mappingService: MappingService) {
    const data = this._activatedRoute.snapshot.data;
    this.itinerary = data.itinerary;
  }

  ngOnInit() {
    //debugger;
    this.itinerary.title = this.itinerary.participants['party 1'][0].name + ' ' + this.itinerary.participants['party 1'][0].surname + ' & ' + this.itinerary.participants['party 1'][1].name + ' ' + this.itinerary.participants['party 1'][1].surname;

    this.itinerary.subTitle = this.mappingService.countryByCode(this.itinerary.extraFieldValues[0].fields[0].selected) + ' & ' + this.mappingService.countryByCode(this.itinerary.extraFieldValues[0].fields[1].value);

    for(const extraFieldValue of this.itinerary.extraFieldValues) {
      for(const field of extraFieldValue.fields) {
        if(field.name == 'bestemming1') {
          if(field.value == 'AU') {
            this.youtubeSource = '';
          } else if(field.value == 'NZ') {
            this.youtubeSource = '';
          }  else if(field.value == 'CK') {
            this.youtubeSource = 'https://www.youtube.com/watch?v=QLByPNEi7_w';
          }
        }
      }
    }
    this.markers = [];
    for (const seg of this.itinerary.segments) {
        for (const element of seg.elements) {
            if(element.maps) {
              if(element.maps.latitude){
                this.markers.push(element.maps)
              }
            }
        }
    }
    this.total = this.itinerary.salesPriceBeforeRounding;
   
    
    //this.tickets  = this.itinerary.segments[0].elements[0].olPrices.costPrice + this.itinerary.segments[0].elements[0].olPrices.salesTotal;
     //this.airport  = this.itinerary.segments[0].elements[1].olPrices.costPrice + this.itinerary.segments[0].elements[1].olPrices.salesTotal; 
     
     //this.airport  = this.itinerary.segments[0].elements[0].olPrices.salesTotal;
     //this.airport  = this.itinerary.segments[0].elements[0].olPrices.salesTotal;
    this.reservation  = this.itinerary.segments[1].elements[0].olPrices.salesTotal;
    this.airport  = this.itinerary.segments[2].elements[1].olPrices.salesTotal;
    this.consultants = [
      {
        name : 'Lana Heere',
        email: 'lana@pacificislandtravel.nl',
        phone: '020-6261325',
        title: 'Reisspecialist (iso Travel Consultant)',
        picture: '../../../assets/images/lana.jpg',
      },
      {
        name : 'Jurgen Pol',
        email: 'jurgen@pacificislandtravel.nl',
        phone: '020-6261325',
        title: 'Reisspecialist',
        picture: '../../../assets/images/jurgen.jpg',
      },
      {
        name : 'Margret Stornebrink',
        email: 'margret@pacificislandtravel.nl',
        phone: '020-6261325',
        title: 'Reisspecialist',
        picture: '../../../assets/images/margret.jpg',
      },
      {
        name : 'Sylvie Jansen',
        email: 'sylvie@pacificislandtravel.nl',
        phone: '020-6261325',
        title: 'Reisspecialist',
        picture: '../../../assets/images/Sylvie-vulkaan.jpg',
      },
      {
        name : 'Marloes van Spijk',
        email: 'marloes@pacificislandtravel.nl',
        phone: '020-6261325',
        title: 'Reisspecialist',
        picture: '../../../assets/images/Marloes.jpg',
      },
      {
        name : 'Merel Geene',
        email: 'merel@pacificislandtravel.nl',
        phone: '020-6261325',
        title: 'Reisspecialist',
        picture: '../../../assets/images/Merel.jpg',
      }
    ];



      let customdata = this.itinerary.extraFieldValues;
      for( const data of customdata ){
        
        for(const fielddata of data.fields)
          {
            this.consultData = fielddata.value;
            //console.log("adat" + this.consultData);
            if (fielddata.name == 'Reisspecialist') {
              for(const j of this.consultants ){
                if (j.name.indexOf(fielddata.value) !== -1) {
                  this.finalConsultants.push(j);
                  // console.log('Hello World' + j.name + " <=> " + fielddata.value);
                }
            }
        
          }
        }
       
      }
      this.socialLinks = {
        facebook : 'https://www.facebook.com/pacificislandtravel.nl/',
        instagram: 'https://www.instagram.com/pacificislandtravel/',
        whatsapp: '',
        email: 'mailto:reisspecialist@pacificislandtravel.nl',
      }
  }
  ngAfterViewInit()
  {
    $('.accommodaties vtb-element').click(function(){
      var prodId = $(this).attr('data-product-id');
      $.getJSON("../../assets/json/stub.json",function(json){
        //debugger;
        var segments = json.segments;
        segments.forEach(function(segment){
          segment.elements.forEach(function(item){
            if(item.TSProduct.id ==prodId )
            {
              $('#accomodateModal #title').html(item.title.toUpperCase());
              $('#accomodateModal #modal-body').html(item.additionalText);
              $('#accomodateModal').show();
            }
          });
        });
      });
    });
    
    $('.menu').click(function(){
      if (window.matchMedia('(max-width: 767.98px)').matches) {
        if($('.menu ul')[0].offsetTop==740){
          $('.menu ul').animate({
            marginTop: '-=740px'
        }, 10);
        }
        else{
          $('.menu ul').animate({
              marginTop: '+=740px'
          }, 10);
        }
      }
    });
  }
  
}
