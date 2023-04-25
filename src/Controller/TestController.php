<?php

namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Asset\PathPackage;
use Symfony\Component\Asset\VersionStrategy\StaticVersionStrategy;
use Symfony\Component\Asset\Context\RequestStackContext;
use Symfony\Component\HttpFoundation\RequestStack;
use Doctrine\DBAL\Connection;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\SerializeService;
use App\Entity\Films;
use App\Entity\Serials;

class TestController extends AbstractController{


    protected $serializer;
    protected $pathPackage;
    protected $req;

    public function __construct(RequestStack $req){
        $this->serializer = SerializeService::getSerializer();
        $this->req = $req->getCurrentRequest();
        $this->pathPackage = new PathPackage(
            '/static/images',
            new StaticVersionStrategy('v1'),
        );
    }

    #[Route(path:'/{reactRouting}', name:'main_page_route', requirements:['reactRouting'=>'^[^(api)](.*)?'], defaults:['reactRouting'=>null],methods:['GET'])]
    public function getPage(){
        return $this->render('index.html.twig');
}   

#[Route(path:'/api/getPosters', methods:['GET'])]
    public function test(Connection $conn, EntityManagerInterface $emi){
        return new Response($this->serializer->serialize([
           'films'=>$emi->getRepository(Films::class)->findBy([],['datetime_added'=>'DESC','raiting'=>'DESC']),
           'serials'=>$emi->getRepository(Serials::class)->findBy([],['datetime_added'=>'DESC','raiting'=>'DESC'])
        ],'json'));
     
    }

    #[Route(path:'/api/getFilm/{id}', methods:['GET'])]
    public function getFilm(Films $film){
        $film_data = $this->serializer->normalize($film,null);
        $img_dir = $this->getParameter('kernel.project_dir').'/public'.$this->pathPackage->getBasePath().$film_data['name'].'/screenshots';
        if(file_exists($img_dir)){
            $images = array_filter(
                 scandir($img_dir),
                 function($path){return $path!='.' && $path!='..';}
                );
                
            $film_data['screenshots'] = array_map(
                fn($image)=>$this->req->getScheme() . '://' . $this->req->getHttpHost().$this->pathPackage->getBasePath().$film_data['name'].'/screenshots/'.$image,
                array_values($images));
        }

        $film_data['preview'] = $this->req->getScheme() . '://' . $this->req->getHttpHost().$this->pathPackage->getBasePath().$film_data['name'].'/preview.jpg';

        return new Response(
            $this->serializer->serialize($film_data,'json')
        );
        
    }

    #[Route(path:'/api/getSerial/{id}', methods:['GET'])]
    public function getSerial(Serials $serial){
        return new Response(
            $this->serializer->serialize($serial,'json')
        );
    }


}
