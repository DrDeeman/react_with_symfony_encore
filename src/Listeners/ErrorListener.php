<?php

namespace App\Listeners;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class ErrorsListener{

  private $router;
  private $params;

  public function __construct(RouterInterface $router,ParameterBagInterface $params)
  {
      $this->router = $router;
      $this->params = $params;
  }
   
    public function onKernelException(ExceptionEvent $event, string $eventName = null){
      $exception = $event->getThrowable();
  
      if($exception instanceof NotFoundHttpException)
        $event->setResponse(new RedirectResponse($this->generateUrl('main_page_route')));
    }
}