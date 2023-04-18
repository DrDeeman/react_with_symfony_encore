<?php

namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\DBAL\Connection;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\SerializeService;
use App\Entity\Films;
use App\Entity\Serials;

class TestController extends AbstractController{


    protected $serializer;

    public function __construct(){
        $this->serializer = SerializeService::getSerializer();
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
        return new Response(
            $this->serializer->serialize($film,'json')
        );
    }
}
