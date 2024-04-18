<?php

namespace App\Repository;

use App\Entity\Prova;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Prova>
 *
 * @method Prova|null find($id, $lockMode = null, $lockVersion = null)
 * @method Prova|null findOneBy(array $criteria, array $orderBy = null)
 * @method Prova[]    findAll()
 * @method Prova[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProvaRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Prova::class);
    }

//    /**
//     * @return Prova[] Returns an array of Prova objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Prova
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
